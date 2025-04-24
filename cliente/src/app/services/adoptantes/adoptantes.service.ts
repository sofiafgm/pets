import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Adoptante } from '../../models/adoptante';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdoptanteService {

  private apiUrl = `http://localhost:3000/adoptantes`;

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {}

  getAdoptantes(headers: any): Observable<Adoptante[]> {
    return this.http.get<Adoptante[]>(this.apiUrl); 
  }

  addAdoptante(adoptante: {
    id: number;
    nombre: string;
    direccion: string;
    contacto: string;
    historial_adopciones: string}, 
    headers: any): Observable<any> {
    return this.http.post(this.apiUrl, adoptante);
  }

  updateAdoptante(id: number, adoptante: Adoptante): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, adoptante);
  }

  deleteAdoptante(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
