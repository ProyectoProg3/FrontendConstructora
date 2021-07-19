import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as crypto from 'crypto-js'; 
import { UsuarioModelo } from 'src/app/modelos/usuario.modelo';
import { SeguridadService } from 'src/app/servicios/seguridad.service';
import { UsuarioModule } from '../../usuario/usuario.module';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent implements OnInit {

  fgValidador: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder,
    private servicioSeguridad: SeguridadService, 
    private router: Router) {

  }

  ConstruirFormulario() {
    this.fgValidador = this.fb.group({
      usuario: ['juliana.1701513897@ucaldas.edu.co', [Validators.required, Validators.email]],
      clave: ['XktdqtChU6', [Validators.required, Validators.min(5)]]
    });
  }

  ngOnInit(): void {
    this.ConstruirFormulario();
  }

  get ObtenerFgValidador(){
    return this.fgValidador.controls;
  }

  ValidarIndetificacion() {
    if(this.fgValidador.invalid){
      alert("Formulario Invalido"); 
    }
    else{
      let usuario = this.ObtenerFgValidador.usuario.value; 
      let clave = this.ObtenerFgValidador.clave.value;
      let claveCifrada = crypto.MD5(clave).toString();

      let modelo= new UsuarioModelo();
      modelo.nombre_usuario = usuario; 
      modelo.contrasena = claveCifrada;

      this.servicioSeguridad.VerificarUsuario(modelo).subscribe(
        (datos: UsuarioModelo) => {
          alert("Datos correctos"); 
          this.servicioSeguridad.AlmacenarDatosSesionEnLocal(datos);
          this.router.navigate(["/inicio"]);
        }, 
        (error) => {
          alert("Datos invalidos"); 
          console.log(error);
        }
      );
    } 
  }

}
