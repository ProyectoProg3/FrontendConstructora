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
  nombreImagenTemp: String = "Sin imagen";

  fgValidador: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder,
    
    private servicio: ProyectoService,
    private router: Router,
    private servicioPaises: PaisService,
    private servicioCiudades: CiudadService,
    private servicioProyectos: ProyectoService) {

  }

  ConstruirFormulario() {
    this.fgValidador = this.fb.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      imagen: ['', []],
      nombreImagen: ['', [Validators.required]],
      paisId: ['', [Validators.required]],
      ciudadId: ['', [Validators.required]],
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
    let img = this.ObtenerFgValidador.nombreImagen.value;
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

  CuandoSeleccionanArchivo(event: any){
    if (event.target.files.length > 0){
      let archivo= event.target.files[0];
      this.fgValidador.controls.imagen.setValue(archivo);
    }else{
      console.log("Se ha cancelado la selecci??n de arhivo")
    }
  }

  CargarImagenAlServidor(){
    let formData= new FormData();
    formData.append('file', this.fgValidador.controls.imagen.value)
    this.servicioProyectos.CargarArchivo(formData).subscribe(
      (datos) => {
        console.log(datos.filename);
        this.fgValidador.controls.nombreImagen.setValue(datos.filename);
      },
      (error) => {
        alert("Se ha producido un error al cargar el archivo.")
      }
    );
  }


}
