import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteModelo } from 'src/app/modelos/cliente.modelo';
import { ClienteService } from 'src/app/servicios/cliente.service';

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrls: ['./crear-cliente.component.css']
})
export class CrearClienteComponent implements OnInit {

  fgValidador: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder,
    private servicio: ClienteService,
    private router: Router) {

  }

  ConstruirFormulario() {
    this.fgValidador = this.fb.group({
      id: ['', [Validators.required]],
      nombres: ['', [Validators.required]],
      documento: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      correo: ['', [Validators.required]],
      numCelular: ['', [Validators.required]],
      fotografia: ['', [Validators.required]],
      fechaNacimiento: ['', [Validators.required]],
      ciudadId: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.ConstruirFormulario();
  }

  get ObtenerFgValidador() {
    return this.fgValidador.controls;
  }

  GuardarRegistro() {
    let nom = this.ObtenerFgValidador.nombres.value;
    let id = this.ObtenerFgValidador.id.value;
    let ape = this.ObtenerFgValidador.apellidos.value;
    let correo = this.ObtenerFgValidador.correo.value;
    let tel = this.ObtenerFgValidador.numCelular.value;
    let foto = this.ObtenerFgValidador.fotografia.value;
    let fnac = this.ObtenerFgValidador.fechaNacimiento.value;
    let ciudadId = this.ObtenerFgValidador.ciudadId.value;
    let dir = this.ObtenerFgValidador.direccion.value;
    let documento= this.ObtenerFgValidador.documento.value;
   

    let modelo: ClienteModelo = new ClienteModelo();

    modelo.nombres = nom;
    modelo.id = id;
    modelo.apellidos = ape;
    modelo.correo = correo;    
    modelo.numCelular = tel;
    modelo.fotografia = foto;
    modelo.fechaNacimiento = fnac;
    modelo.ciudadId = parseInt(ciudadId);
    modelo.direccion = dir;
    modelo.documento= documento;

    this.servicio.AlmacenarRegistro(modelo).subscribe(
      (datos) =>{
        alert("Registro almacenado correctamente.");
        this.router.navigate(["/parametros/listar-clientes"]);
      },
      (err) =>{
        alert("Error almacenando el registro");
      }
    );
  }

}
