import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatosGenerales } from '../config/datos.generales';
import { BloqueModelo } from '../modelos/bloque.modelo';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class BloqueService {

  url: String = DatosGenerales.url;
  token?: String = "";

  constructor(private http: HttpClient, 
    private servicioSeguridad: SeguridadService) { 
    this.token = this.servicioSeguridad.ObtenerToken();
  }

  ListarRegistros(): Observable<BloqueModelo[]> {
    return this.http.get<BloqueModelo[]>(`${this.url}/bloques`);
  }

  BuscarRegistro(id: number): Observable<BloqueModelo> {
    return this.http.get<BloqueModelo>(`${this.url}/bloques/${id}`);
  }

  AlmacenarRegistro(modelo: BloqueModelo): Observable<BloqueModelo> {
    return this.http.post<BloqueModelo>(
      `${this.url}/bloques`,
      {
        nombre: modelo.nombre,
        descripcion: modelo.descripcion
      },
      {
        headers: new HttpHeaders({
          "Authorization":`Bearer ${this.token}`
        })
      });
  }

  ModificarRegistro(modelo: BloqueModelo): Observable<BloqueModelo> {
    return this.http.put<BloqueModelo>(
      `${this.url}/bloques/${modelo.id}`,
      {
        nombre: modelo.nombre,
        descripcion: modelo.descripcion
      },
      {
        headers: new HttpHeaders({
          "Authorization":`Bearer ${this.token}`
        })
      });
  }

  EliminarRegistro(id: number): Observable<BloqueModelo> {
    return this.http.delete<BloqueModelo>(
      `${this.url}/bloques/${id}`,
      {
        headers: new HttpHeaders({
          "Authorization":`Bearer ${this.token}`
        })
      });
  }
}
