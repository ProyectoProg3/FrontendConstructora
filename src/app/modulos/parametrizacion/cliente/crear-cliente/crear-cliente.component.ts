import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CiudadModelo } from 'src/app/modelos/ciudad.modelo';
import { ClienteModelo } from 'src/app/modelos/cliente.modelo';
import { PaisModelo } from 'src/app/modelos/pais.modelo';
import { CiudadService } from 'src/app/servicios/ciudad.service';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { PaisService } from 'src/app/servicios/pais.service';


declare var iniciarSelect: any;

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrls: ['./crear-cliente.component.css']
})
export class CrearClienteComponent implements OnInit {

  listaPaises: PaisModelo[] = []
  listaCiudades: CiudadModelo[] = []

  fgValidador: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder,
    private servicio: ClienteService,
    private router: Router,
    private servicioPaises: PaisService,
    private servicioCiudades: CiudadService) {

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
      paisId: ['', []],
      ciudadId: ['', []],
      direccion: ['', [Validators.required]],
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
