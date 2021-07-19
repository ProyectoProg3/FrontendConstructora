import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UsuarioModelo } from '../modelos/usuario.modelo';

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {

  datosDeSesion: BehaviorSubject<UsuarioModelo> = new BehaviorSubject<UsuarioModelo>(new UsuarioModelo());

  constructor(private http: HttpClient) { 
    this.VerificarSesion();
  }

  VerificarSesion() {
    let datos = localStorage.getItem("session-data"); 
    if(datos){
      let datosEnObjeto: UsuarioModelo = JSON.parse(datos);
      datosEnObjeto.isLoggedIn = true;
      this.RefrescarDatosSesion(datosEnObjeto);
    }
  }

  VerificarUsuario(modelo: UsuarioModelo): Observable<any>{
    return this.http.post<any>(
      `http://localhost:3000/identificar-usuario`, 
      {
        nombre_usuario: modelo.nombre_usuario,
        contrasena: modelo.contrasena
      },
      {
        headers: new HttpHeaders({

        })
      });
  }

  RefrescarDatosSesion(usuarioModelo: UsuarioModelo){
    this.datosDeSesion.next(usuarioModelo); 
  }

  ObtenerDatosSesion(){
    return this.datosDeSesion.asObservable();
  }

  AlmacenarDatosSesionEnLocal(usuarioModelo: UsuarioModelo): Boolean{
    let datos = localStorage.getItem("session-data");
    if(datos){
      return false; 
    } else {
      let datosString = JSON.stringify(usuarioModelo);
      localStorage.setItem("session-data", datosString);
      usuarioModelo.isLoggedIn = true; 
      this.RefrescarDatosSesion(usuarioModelo);
      return true; 
    }
  }

  RemoverLocalStorage() {
    let datos = localStorage.removeItem("session-data");
    this.RefrescarDatosSesion(new UsuarioModelo());
  }

}
