import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatosGenerales } from '../config/datos.generales';
import { InfoFinancieraModelo } from '../modelos/info-financiera.modelo';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class InfoFinancieraService {

  url: String = DatosGenerales.url;
  token?: String = "";

  constructor(private http: HttpClient,
    private servicioSeguridad: SeguridadService) {
    this.token = this.servicioSeguridad.ObtenerToken();
  }

  ListarRegistros(): Observable<InfoFinancieraModelo[]> {
    return this.http.get<InfoFinancieraModelo[]>(`${this.url}/info-financiera`);
  }


  BuscarRegistro(id: number): Observable<InfoFinancieraModelo> {
    return this.http.get<InfoFinancieraModelo>(`${this.url}/info-financiera/${id}`);
  }



  AlmacenarRegistro(modelo: InfoFinancieraModelo): Observable<InfoFinancieraModelo> {
    return this.http.post<InfoFinancieraModelo>(
      `${this.url}/info-financiera`,
      {
        id: modelo.id,
        totalIngresos: modelo.totalIngresos,
        datosTrabajo: modelo.datosTrabajo,
        TiempoTrabActual: modelo.TiempoTrabActual,
        nombreRefFamiliar: modelo.nombreRefFamiliar,
        telRefFamiliar: modelo.telRefFamiliar,
        nombreRefPersonal: modelo.nombreRefPersonal,
        telRefPersonal: modelo.telRefPersonal,
        clienteId: modelo.clienteId,
      },
      {
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      });
  }

  ModificarRegistro(modelo: InfoFinancieraModelo): Observable<InfoFinancieraModelo> {
    return this.http.put<InfoFinancieraModelo>(
      `${this.url}/info-financiera/${modelo.id}`,
      {
        totalIngresos: modelo.totalIngresos,
        datosTrabajo: modelo.datosTrabajo,
        TiempoTrabActual: modelo.TiempoTrabActual,
        nombreRefFamiliar: modelo.nombreRefFamiliar,
        telRefFamiliar: modelo.telRefFamiliar,
        nombreRefPersonal: modelo.nombreRefPersonal,
        telRefPersonal: modelo.telRefPersonal,
        clienteId: modelo.clienteId    
      },
      {
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      });
  }

  EliminarRegistro(id: number): Observable<InfoFinancieraModelo> {
    return this.http.delete<InfoFinancieraModelo>(
      `${this.url}/info-financiera/${id}`,
      {
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      });
  }
}
