import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdopcionService } from "../../services/adopciones/adopciones.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Adopcion } from "../../models/adopcion";
import { FormsModule } from "@angular/forms";

@Component({
    selector: "app-adopciones",
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: "./adopciones.component.html",
    styleUrl: "./adopciones.component.scss",
})
export class AdopcionesComponent implements OnInit {
    adopciones: any[] = [];

    newAdopcion: {
      id: number;
      id_mascota: number;
      nombre_mascota: string;
      id_adoptante: number;
      nombre_adoptante: string;
      fecha_adopcion: string;
      observaciones: string;
    } = {
        id: 0,
        id_mascota: 0,
        nombre_mascota: "",
        id_adoptante: 0,
        nombre_adoptante: "",
        fecha_adopcion: "",
        observaciones: "",
    };

    constructor(
        public data: AdopcionService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.route.data.subscribe((data) => {
            const adopcion = data["adopcion"];
            if (adopcion) {
                this.newAdopcion = adopcion;
            }
        });
    }

    ngOnInit(): void {
        const token = localStorage.getItem("token");
        this.data
            .getAdopciones({
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .subscribe({
                next: (data) => {
                    this.adopciones = data;
                },
                error: (err) => {
                    console.error("Error al cargar adopciones:", err);
                },
            });
    }

    deleteAdopcion(id: number): void {
        const confirmed = window.confirm(
            "¿Estás seguro de borrar la adopcion?"
        );
        if (confirmed) {
            this.data.deleteAdopcion(id).subscribe(
                () => {
                    this.adopciones = this.adopciones.filter(
                        (adopcion) => adopcion.id !== id
                    );
                    this.router.navigate(["/adopciones"]);
                },
                (error: any) => {
                    console.error("Error al borrar", error);
                }
            );
        }
    }

    editAdopcion(adopcion: Adopcion): void {
        this.newAdopcion = { ...adopcion };
    }

    cancelEdit(): void {
        this.newAdopcion = {
          id: 0,
          id_mascota: 0,
          nombre_mascota: "",
          id_adoptante: 0,
          nombre_adoptante: "",
          fecha_adopcion: "",
          observaciones: "",
        };
        this.router.navigate(["/adopciones"]);
    }

    onSubmit(): void {
        if (!this.newAdopcion) return;

        if (this.newAdopcion.id) {
            this.data
                .updateAdopcion(this.newAdopcion.id, this.newAdopcion)
                .subscribe(
                    () => {
                        const index = this.adopciones.findIndex(
                            (m) => m.id === this.newAdopcion.id
                        );
                        if (index !== -1) {
                            this.adopciones[index] = { ...this.newAdopcion };
                        }
                        this.newAdopcion = {
                          id: 0,
                          id_mascota: 0,
                          nombre_mascota: "",
                          id_adoptante: 0,
                          nombre_adoptante: "",
                          fecha_adopcion: "",
                          observaciones: "",
                        };
                        this.router.navigate(["/adopciones"]);
                    },
                    (error: any) => {
                        console.error(
                            "Error al actualizar la adopcion",
                            error
                        );
                    }
                );
        } else {
            this.data
                .addAdopcion(this.newAdopcion, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                })
                .subscribe({
                    next: (data: any) => {
                        this.adopciones.push(data);
                        this.newAdopcion = {
                          id: 0,
                          id_mascota: 0,
                          nombre_mascota: "",
                          id_adoptante: 0,
                          nombre_adoptante: "",
                          fecha_adopcion: "",
                          observaciones: "",
                        };
                        this.router.navigate(["/adopciones"]);
                    },
                    error: (error: any) => {
                        console.error("Error al añadir la adopcion", error);
                    },
                });
        }
    }
}
