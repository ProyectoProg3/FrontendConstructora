import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProyectoModelo } from 'src/app/modelos/proyecto.modelo';
import { ProyectoService } from 'src/app/servicios/proyecto.service';

@Component({
  selector: 'app-crear-proyecto',
  templateUrl: './crear-proyecto.component.html',
  styleUrls: ['./crear-proyecto.component.css']
})
export class CrearProyectoComponent implements OnInit {

  fgValidador: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder,
    private servicio: ProyectoService,
    private router: Router) {

  }

  ConstruirFormulario() {
    this.fgValidador = this.fb.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      imagen: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.ConstruirFormulario();
  }

  get ObtenerFgValidador() {
    return this.fgValidador.controls;
  }

  GuardarRegistro() {
    let iden = this.ObtenerFgValidador.nombre.value;
    let desc = this.ObtenerFgValidador.descripcion.value;
    let img = this.ObtenerFgValidador.imagen.value;
    let modelo: ProyectoModelo = new ProyectoModelo();
    modelo.nombre = iden;
    modelo.descripcion = desc;
    modelo.imagen = img;
    this.servicio.AlmacenarRegistro(modelo).subscribe(
      (datos) => {
        alert("Registro almacenado correctamente.");
        this.router.navigate(["/parametros/listar-proyectos"]);
      },
      (err) => {
        alert("Error almacenando el registro");
      }
    );
  }

}
