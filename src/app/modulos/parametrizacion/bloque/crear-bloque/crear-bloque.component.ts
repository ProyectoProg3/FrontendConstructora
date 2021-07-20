import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BloqueModelo } from 'src/app/modelos/bloque.modelo';
import { ProyectoModelo } from 'src/app/modelos/proyecto.modelo';
import { PaisModelo } from 'src/app/modelos/pais.modelo';
import { CiudadModelo } from 'src/app/modelos/ciudad.modelo';
import { BloqueService } from 'src/app/servicios/bloque.service';
import { ProyectoService } from 'src/app/servicios/proyecto.service';
import { PaisService } from 'src/app/servicios/pais.service';
import { CiudadService } from 'src/app/servicios/ciudad.service';

declare var iniciarSelect: any;

@Component({
  selector: 'app-crear-bloque',
  templateUrl: './crear-bloque.component.html',
  styleUrls: ['./crear-bloque.component.css']
})
export class CrearBloqueComponent implements OnInit {

  listaPaises: PaisModelo[] = []
  listaCiudades: CiudadModelo[] = []
  listaProyectos: ProyectoModelo[] = []

  fgValidador: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder,
    private servicio: BloqueService,
    private router: Router,
    private servicioPaises: PaisService,
    private servicioCiudades: CiudadService,
    private servicioProyectos: ProyectoService) {

  }

  ConstruirFormulario() {
    this.fgValidador = this.fb.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      paisId: ['', [Validators.required]],
      ciudadId: ['', [Validators.required]],
      proyectoId: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.ConstruirFormulario();
    this.cargarPaises()

  }


  cargarPaises(){
    this.servicioPaises.ListarRegistros().subscribe(
      (datos) => {
        this.listaPaises= datos;
        setTimeout(() => {
          iniciarSelect()
        }, 500);
      }
    )
  }

  cargarCiudadesPorPais(){
    this.servicioCiudades.BuscarRegistroPorIdPais(this.fgValidador.controls.paisId.value).subscribe(
      (datos) => {
        console.log(datos)
        this.listaCiudades= datos;
        setTimeout(() => {
          iniciarSelect()
        }, 500);
      }
    )
  }

  cargarProyectosPorCiudad(){
    this.servicioProyectos.BuscarRegistroPorIdCiudad(this.fgValidador.controls.ciudadId.value).subscribe(
      (datos) => {
        console.log(datos)
        this.listaProyectos= datos;
        setTimeout(() => {
          iniciarSelect()
        }, 500);
      }
    )
  }

  get ObtenerFgValidador() {
    return this.fgValidador.controls;
  }

  GuardarRegistro() {
    let iden = this.ObtenerFgValidador.nombre.value;
    let desc = this.ObtenerFgValidador.descripcion.value;
    let proyecto = this.ObtenerFgValidador.proyectoId.value;
    console.log(proyecto)
    let modelo: BloqueModelo = new BloqueModelo();
    modelo.nombre = iden;
    modelo.descripcion = desc;
    modelo.proyectoId = parseInt(proyecto);
    this.servicio.AlmacenarRegistro(modelo).subscribe(
      (datos) => {
        alert("Registro almacenado correctamente.");
        this.router.navigate(["/parametros/listar-bloques"]);
      },
      (err) => {
        alert("Error almacenando el registro");
      }
    );
  }

}
