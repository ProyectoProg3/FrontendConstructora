import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CiudadModelo } from 'src/app/modelos/ciudad.modelo';
import { PaisModelo } from 'src/app/modelos/pais.modelo';
import { ProyectoModelo } from 'src/app/modelos/proyecto.modelo';
import { CiudadService } from 'src/app/servicios/ciudad.service';
import { PaisService } from 'src/app/servicios/pais.service';
import { ProyectoService } from 'src/app/servicios/proyecto.service';

declare var iniciarSelect: any;

@Component({

  
  selector: 'app-crear-proyecto',
  templateUrl: './crear-proyecto.component.html',
  styleUrls: ['./crear-proyecto.component.css']
})
export class CrearProyectoComponent implements OnInit {
  listaPaises: PaisModelo[] = []
  listaCiudades: CiudadModelo[] = []
  fgValidador: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder,
    
    private servicio: ProyectoService,
    private router: Router,
    private servicioPaises: PaisService,
    private servicioCiudades: CiudadService) {

  }

  ConstruirFormulario() {
    this.fgValidador = this.fb.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      imagen: ['', [Validators.required]],
      paisId: ['', []],
      ciudadId: ['', []],
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
        this.listaCiudades= datos;
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
    let img = this.ObtenerFgValidador.imagen.value;
    let ciudad = this.ObtenerFgValidador.ciudadId.value;
    let modelo: ProyectoModelo = new ProyectoModelo();
    console.log(modelo)
    modelo.nombre = iden;
    modelo.descripcion = desc;
    modelo.imagen = img;
    modelo.ciudadId = parseInt(ciudad);
    
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
