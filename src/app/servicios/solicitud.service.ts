import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatosGenerales } from '../config/datos.generales';
import { SolicitudModelo } from '../modelos/solicitud.modelo';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  url: String = DatosGenerales.url;
  token?: String = "";

  constructor(private http: HttpClient,
    private servicioSeguridad: SeguridadService) {
    this.token = this.servicioSeguridad.ObtenerToken();
  }

  ListarRegistros(): Observable<SolicitudModelo[]> {
    return this.http.get<SolicitudModelo[]>(`${this.url}/solicitud-cliente-inmueble`);
  }


  BuscarRegistro(id: number): Observable<SolicitudModelo> {
    return this.http.get<SolicitudModelo>(`${this.url}/solicitud-cliente-inmueble/${id}`);
  }



  AlmacenarRegistro(modelo: SolicitudModelo): Observable<SolicitudModelo> {
    return this.http.post<SolicitudModelo>(
      `${this.url}/solicitud-cliente-inmueble`,
      {
        id: modelo.id,
        fechaSolicitud: modelo.fechaSolicitud,
        oferta: modelo.oferta,
        clienteId: modelo.clienteId,
        inmuebleId: modelo.inmuebleId,
        estadoSolicitudId: modelo.estadoSolicitudId,
      },
      {
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      });
  }

  ModificarRegistro(modelo: SolicitudModelo): Observable<SolicitudModelo> {
    return this.http.put<SolicitudModelo>(
      `${this.url}/solicitud-cliente-inmueble/${modelo.id}`,
      {
        fechaSolicitud: modelo.fechaSolicitud,
        oferta: modelo.oferta,
        clienteId: modelo.clienteId,
        inmuebleId: modelo.inmuebleId,
        estadoSolicitudId: modelo.estadoSolicitudId,
      },
      {
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      });
  }

  EliminarRegistro(id: number): Observable<SolicitudModelo> {
    return this.http.delete<SolicitudModelo>(
      `${this.url}/solicitud-cliente-inmueble/${id}`,
      {
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      });
  }
}
