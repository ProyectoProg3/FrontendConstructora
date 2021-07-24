import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteModelo } from 'src/app/modelos/cliente.modelo';
import { InmuebleModelo } from 'src/app/modelos/inmueble.modelo';
import { SolicitudModelo } from 'src/app/modelos/solicitud.modelo';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { InmuebleService } from 'src/app/servicios/inmueble.service';
import { SolicitudService } from 'src/app/servicios/solicitud.service';




declare var iniciarSelect: any;

@Component({
  selector: 'app-crear-solicitud',
  templateUrl: './crear-solicitud.component.html',
  styleUrls: ['./crear-solicitud.component.css']
})
export class CrearSolicitudComponent implements OnInit {

  listaClientes: ClienteModelo[] = []
  listaInmuebles: InmuebleModelo[] = []
  listaSolicitudes: SolicitudModelo[] = []


  fgValidador: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder,
    private servicioClientes: ClienteService,
    private router: Router,
    private servicio: SolicitudService,
    private servicioInmuebles: InmuebleService) {

  }

  ConstruirFormulario() {
    this.fgValidador = this.fb.group({
      fechaSolicitud: ['', [Validators.required]],
      oferta: ['', [Validators.required]],
      clienteId: ['', [Validators.required]],
      inmuebleId: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.ConstruirFormulario();
    this.cargarClientes();
    this.cargarInmuebles();
    this.cargarSolicitudes();
  }

  cargarClientes() {
    this.servicioClientes.ListarRegistros().subscribe(
      (datos) => {
        this.listaClientes = datos;
        setTimeout(() => {
          iniciarSelect()
        }, 500);
      }
    )
  }

  cargarSolicitudes() {
    this.servicio.ListarRegistros().subscribe(
      (datos) => {
        this.listaSolicitudes = datos;
        setTimeout(() => {
          iniciarSelect()
        }, 500);
      }
    )
  }

  cargarInmuebles() {
    this.servicioInmuebles.ListarRegistros().subscribe(
      (datos) => {
        this.listaInmuebles = datos;
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
    let fechaSolicitud = this.ObtenerFgValidador.fechaSolicitud.value;
    let oferta = this.ObtenerFgValidador.oferta.value;
    let clienteId = this.ObtenerFgValidador.clienteId.value;
    let inmuebleId = this.ObtenerFgValidador.inmuebleId.value;
    let alerta = false;
    this.listaSolicitudes.forEach(function (valor, indice, listaSolicitudes) {
      if (valor.inmuebleId == inmuebleId) {
        alert("El inmueble ya tiene otra solicitud en estudio");
        alerta = true;
      }
    });
    if (alerta == false) {  // Si no se encontró el mismo id del inmueble ya registrado
      let modelo: SolicitudModelo = new SolicitudModelo();

      modelo.oferta = parseInt(oferta);
      modelo.fechaSolicitud = fechaSolicitud;
      modelo.clienteId = parseInt(clienteId);
      modelo.inmuebleId = parseInt(inmuebleId);
      modelo.estadoSolicitudId = 1; //Se creó en la base de datos el estado de solicitud con ID 1 = En Estudio
      this.servicio.AlmacenarRegistro(modelo).subscribe(
        (datos) => {
          alert("Registro almacenado correctamente.");
          this.router.navigate(["/ventas/listar-solicitud"]);
        },
        (err) => {
          alert("Error almacenando el registro");

        }
      );

    }
  }





}
