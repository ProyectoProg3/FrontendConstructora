import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CiudadModelo } from 'src/app/modelos/ciudad.modelo';
import { PaisModelo } from 'src/app/modelos/pais.modelo';
import { ProyectoModelo } from 'src/app/modelos/proyecto.modelo';
import { CiudadService } from 'src/app/servicios/ciudad.service';
import { PaisService } from 'src/app/servicios/pais.service';
import { ProyectoService } from 'src/app/servicios/proyecto.service';


declare var iniciarSelect: any;

@Component({
  selector: 'app-editar-proyecto',
  templateUrl: './editar-proyecto.component.html',
  styleUrls: ['./editar-proyecto.component.css']
})
export class EditarProyectoComponent implements OnInit {

  listaPaises: PaisModelo[] = []
  listaCiudades: CiudadModelo[] = []
  fgValidador: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder,
    private servicio: ProyectoService,
    private router: Router,
    private route: ActivatedRoute,
    private servicioPaises: PaisService,
    private servicioCiudades: CiudadService) {

  }

  ConstruirFormulario() {
    this.fgValidador = this.fb.group({
      id: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      imagen: ['', [Validators.required]],
      paisId: ['', [Validators.required]],
      ciudadId: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.ConstruirFormulario();
    let id = this.route.snapshot.params["id"];
    this.ObtenerRegistroPorId(id);
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
        this.listaCiudades= datos;
        setTimeout(() => {
          iniciarSelect()
        }, 500);
      }
    )
  }

  ObtenerRegistroPorId(id: number) {
    this.servicio.BuscarRegistro(id).subscribe((datos) => {
      this.ObtenerFgValidador.nombre.setValue(datos.nombre);
      this.ObtenerFgValidador.descripcion.setValue(datos.descripcion);
      this.ObtenerFgValidador.imagen.setValue(datos.imagen);
      this.ObtenerFgValidador.id.setValue(datos.id);
      this.ObtenerFgValidador.ciudadId.setValue(datos.ciudadId)
    },
      (err) => {
        alert("No se encuentra el registro con id " + id);
      });
  }

  get ObtenerFgValidador() {
    return this.fgValidador.controls;
  }

  ModificarRegistro() {
    let nom = this.ObtenerFgValidador.nombre.value;
    let id = this.ObtenerFgValidador.id.value;
    let desc = this.ObtenerFgValidador.descripcion.value;
    let img = this.ObtenerFgValidador.imagen.value;
    let ciudad = this.ObtenerFgValidador.ciudadId.value;
    let modelo: ProyectoModelo = new ProyectoModelo();
    modelo.nombre = nom;
    modelo.id = id;
    modelo.descripcion = desc;
    modelo.imagen = img;
    modelo.ciudadId = parseInt(ciudad);
    this.servicio.ModificarRegistro(modelo).subscribe(
      (datos) => {
        alert("Registro modificado correctamente.");
        this.router.navigate(["/parametros/listar-proyectos"]);
      },
      (err) => {
        alert("Error modificando el registro");
      }
    );
  }
  

}
