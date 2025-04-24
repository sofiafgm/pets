import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mascota } from '../../models/mascota';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MascotaService {

  private apiUrl = `http://localhost:3000/mascotas`;

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {}

  getMascotas(headers: any): Observable<Mascota[]> {
    return this.http.get<Mascota[]>(this.apiUrl); 
  }

  addMascota(mascota: {
    id:number, 
    nombre:string, 
    especie:string, 
    raza:string, 
    edad:number, 
    estado_salud:string, 
    descripcion:string}, 
    headers: any): Observable<any> {
    return this.http.post(this.apiUrl, mascota);
  }

  updateMascota(id: number, mascota: Mascota): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, mascota);
  }

  deleteMascota(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
