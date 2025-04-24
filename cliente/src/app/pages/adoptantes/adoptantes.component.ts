import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdoptanteService } from "../../services/adoptantes/adoptantes.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Adoptante } from "../../models/adoptante";
import { FormsModule } from "@angular/forms";

@Component({
    selector: "app-adoptantes",
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: "./adoptantes.component.html",
    styleUrl: "./adoptantes.component.scss",
})
export class AdoptantesComponent implements OnInit {
    adoptantes: any[] = [];

    newAdoptante: {
        id: number;
        nombre: string;
        direccion: string;
        contacto: string;
        historial_adopciones: string;
    } = {
        id: 0,
        nombre: "",
        direccion: "",
        contacto: "",
        historial_adopciones: "",
    };

    constructor(
        public data: AdoptanteService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.route.data.subscribe((data) => {
            const adoptante = data["adoptante"];
            if (adoptante) {
                this.newAdoptante = adoptante;
            }
        });
    }

    ngOnInit(): void {
        const token = localStorage.getItem("token");
        this.data
            .getAdoptantes({
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .subscribe({
                next: (data) => {
                    this.adoptantes = data;
                },
                error: (err) => {
                    console.error("Error al cargar adoptantes:", err);
                },
            });
    }

    deleteAdoptante(id: number): void {
        const confirmed = window.confirm(
            "¿Estás seguro de borrar al adoptante?"
        );
        if (confirmed) {
            this.data.deleteAdoptante(id).subscribe(
                () => {
                    this.adoptantes = this.adoptantes.filter(
                        (adoptante) => adoptante.id !== id
                    );
                    this.router.navigate(["/adoptantes"]);
                },
                (error: any) => {
                    console.error("Error al borrar", error);
                }
            );
        }
    }

    editAdoptante(adoptante: Adoptante): void {
        this.newAdoptante = { ...adoptante };
    }

    cancelEdit(): void {
        this.newAdoptante = {
            id: 0,
            nombre: "",
            direccion: "",
            contacto: "",
            historial_adopciones: "",
        };
        this.router.navigate(["/adoptantes"]);
    }

    onSubmit(): void {
        if (!this.newAdoptante) return;

        if (this.newAdoptante.id) {
            this.data
                .updateAdoptante(this.newAdoptante.id, this.newAdoptante)
                .subscribe(
                    () => {
                        const index = this.adoptantes.findIndex(
                            (m) => m.id === this.newAdoptante.id
                        );
                        if (index !== -1) {
                            this.adoptantes[index] = { ...this.newAdoptante };
                        }
                        this.newAdoptante = {
                            id: 0,
                            nombre: "",
                            direccion: "",
                            contacto: "",
                            historial_adopciones: "",
                        };
                        this.router.navigate(["/adoptantes"]);
                    },
                    (error: any) => {
                        console.error(
                            "Error al actualizar al adoptante",
                            error
                        );
                    }
                );
        } else {
            this.data
                .addAdoptante(this.newAdoptante, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                })
                .subscribe({
                    next: (data: any) => {
                        this.adoptantes.push(data);
                        this.newAdoptante = {
                            id: 0,
                            nombre: "",
                            direccion: "",
                            contacto: "",
                            historial_adopciones: "",
                        };
                        this.router.navigate(["/adoptantes"]);
                    },
                    error: (error: any) => {
                        console.error("Error al añadir al adoptante", error);
                    },
                });
        }
    }
}
