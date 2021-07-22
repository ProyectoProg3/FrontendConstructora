import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BloqueModelo } from 'src/app/modelos/bloque.modelo';
import { CiudadModelo } from 'src/app/modelos/ciudad.modelo';
import { PaisModelo } from 'src/app/modelos/pais.modelo';
import { ProyectoModelo } from 'src/app/modelos/proyecto.modelo';
import { BloqueService } from 'src/app/servicios/bloque.service';
import { CiudadService } from 'src/app/servicios/ciudad.service';
import { PaisService } from 'src/app/servicios/pais.service';
import { ProyectoService } from 'src/app/servicios/proyecto.service';

declare var iniciarSelect: any;

@Component({
  selector: 'app-editar-bloque',
  templateUrl: './editar-bloque.component.html',
  styleUrls: ['./editar-bloque.component.css']
})
export class EditarBloqueComponent implements OnInit {

  listaPaises: PaisModelo[] = []
  listaCiudades: CiudadModelo[] = []
  listaProyectos: ProyectoModelo[] = []

  fgValidador: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder,
    private servicio: BloqueService,
    private router: Router,
    private route: ActivatedRoute,
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
    let id = this.route.snapshot.params["id"];
    this.ObtenerRegistroPorId(id);
    this.cargarPaises()
  }

  ObtenerRegistroPorId(id: number) {
    this.servicio.BuscarRegistro(id).subscribe((datos) => {
      this.ObtenerFgValidador.nombre.setValue(datos.nombre);
      this.ObtenerFgValidador.descripcion.setValue(datos.descripcion);
      this.ObtenerFgValidador.id.setValue(datos.id);
      this.ObtenerFgValidador.proyectoId.setValue(datos.proyectoId);
    },
      (err) => {
        alert("No se encuentra el registro con id " + id);
      });
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

  ModificarRegistro() {
    let nom = this.ObtenerFgValidador.nombre.value;
    let id = this.ObtenerFgValidador.id.value;
    let desc = this.ObtenerFgValidador.descripcion.value;
    let proyecto = this.ObtenerFgValidador.proyectoId.value;
    let modelo: BloqueModelo = new BloqueModelo();
    modelo.nombre = nom;
    modelo.id = id;
    modelo.descripcion = desc;
    modelo.proyectoId = parseInt(proyecto);
    this.servicio.ModificarRegistro(modelo).subscribe(
      (datos) => {
        alert("Registro modificado correctamente.");
        this.router.navigate(["/parametros/listar-bloques"]);
      },
      (err) => {
        alert("Error modificando el registro");
      }
    );
  }

}