import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InmuebleModelo } from 'src/app/modelos/inmueble.modelo';
import { InmuebleService } from 'src/app/servicios/inmueble.service';

@Component({
  selector: 'app-crear-inmueble',
  templateUrl: './crear-inmueble.component.html',
  styleUrls: ['./crear-inmueble.component.css']
})
export class CrearInmuebleComponent implements OnInit {

  fgValidador: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder,
    private servicio: InmuebleService,
    private router: Router) {

  }

  ConstruirFormulario() {
    this.fgValidador = this.fb.group({
      identificador: ['', [Validators.required]],
      valor: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.ConstruirFormulario();
  }

  get ObtenerFgValidador() {
    return this.fgValidador.controls;
  }

  GuardarRegistro() {
    let iden = this.ObtenerFgValidador.identificador.value;
    let val = this.ObtenerFgValidador.valor.value;
    let modelo:InmuebleModelo = new InmuebleModelo();
    modelo.identificador = iden;
    modelo.valor = val;
    this.servicio.AlmacenarRegistro(modelo).subscribe(
      (datos) =>{
        alert("Registro almacenado correctamente.");
        this.router.navigate(["/parametros/listar-inmuebles"]);
      },
      (err) =>{
        alert("Error almacenando el registro");
      }
    );
  }
}