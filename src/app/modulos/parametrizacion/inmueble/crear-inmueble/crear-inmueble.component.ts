import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BloqueModelo } from 'src/app/modelos/bloque.modelo';
import { CiudadModelo } from 'src/app/modelos/ciudad.modelo';
import { InmuebleModelo } from 'src/app/modelos/inmueble.modelo';
import { PaisModelo } from 'src/app/modelos/pais.modelo';
import { ProyectoModelo } from 'src/app/modelos/proyecto.modelo';
import { BloqueService } from 'src/app/servicios/bloque.service';
import { CiudadService } from 'src/app/servicios/ciudad.service';
import { InmuebleService } from 'src/app/servicios/inmueble.service';
import { PaisService } from 'src/app/servicios/pais.service';
import { ProyectoService } from 'src/app/servicios/proyecto.service';


declare var iniciarSelect: any;

@Component({
  selector: 'app-crear-inmueble',
  templateUrl: './crear-inmueble.component.html',
  styleUrls: ['./crear-inmueble.component.css']
})
export class CrearInmuebleComponent implements OnInit {

  listaPaises: PaisModelo[] = []
  listaCiudades: CiudadModelo[] = []
  listaProyectos: ProyectoModelo[] = []
  listaBloques: BloqueModelo[] = []
  fgValidador: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder,
    private servicio: InmuebleService,
    private router: Router,
    private servicioPaises: PaisService,
    private servicioCiudades: CiudadService,
    private servicioBloques: BloqueService,
    private servicioProyectos: ProyectoService) {

  }

  ConstruirFormulario() {
    this.fgValidador = this.fb.group({
      identificador: ['', [Validators.required]],
      valor: ['', [Validators.required]],
      paisId: ['', [Validators.required]],
      ciudadId: ['', [Validators.required]],
      proyectoId: ['', [Validators.required]],
      bloqueId: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.ConstruirFormulario();
    this.cargarPaises();
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

  cargarBloquesPorProyecto(){
    this.servicioBloques.BuscarRegistroPorIdProyecto(this.fgValidador.controls.proyectoId.value).subscribe(
      (datos) => {
        console.log(datos)
        this.listaBloques= datos;
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
    let iden = this.ObtenerFgValidador.identificador.value;
    let val = this.ObtenerFgValidador.valor.value;
    let bloque = this.ObtenerFgValidador.bloqueId.value;
    let modelo:InmuebleModelo = new InmuebleModelo();
    modelo.identificador = iden;
    modelo.valor = parseInt(val);
    modelo.bloqueId = parseInt(bloque);
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