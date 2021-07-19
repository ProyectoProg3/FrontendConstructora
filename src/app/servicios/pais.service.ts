import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatosGenerales } from '../config/datos.generales';
import { PaisModelo } from '../modelos/pais.modelo';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class PaisService {
  url: String = DatosGenerales.url;
  token?: String = "";

  constructor(private http: HttpClient, 
    private servicioSeguridad: SeguridadService) { 
    this.token = this.servicioSeguridad.ObtenerToken();
  }

  ListarRegistros(): Observable<PaisModelo[]> {
    return this.http.get<PaisModelo[]>(`${this.url}/paises`);
  }


  BuscarRegistro(id: number): Observable<PaisModelo> {
    return this.http.get<PaisModelo>(`${this.url}/paises/${id}`);
  }

  AlmacenarRegistro(modelo: PaisModelo): Observable<PaisModelo> {
    return this.http.post<PaisModelo>(
      `${this.url}/paises`,
      {
        nombre: modelo.nombre
      },
      {
        headers: new HttpHeaders({
          "Authorization":`Bearer ${this.token}`
        })
      });
  }


  ModificarRegistro(modelo: PaisModelo): Observable<PaisModelo> {
    return this.http.put<PaisModelo>(
      `${this.url}/paises/${modelo.id}`,
      {
        nombre: modelo.nombre
      },
      {
        headers: new HttpHeaders({
          "Authorization":`Bearer ${this.token}`
        })
      });
  }

  EliminarRegistro(id: number): Observable<PaisModelo> {
    return this.http.delete<PaisModelo>(
      `${this.url}/paises/${id}`,
      {
        headers: new HttpHeaders({
          "Authorization":`Bearer ${this.token}`
        })
      });
  }
}