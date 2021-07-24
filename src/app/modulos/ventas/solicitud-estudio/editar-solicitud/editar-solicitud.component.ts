import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ClienteModelo } from 'src/app/modelos/cliente.modelo';
import { InmuebleModelo } from 'src/app/modelos/inmueble.modelo';
import { SolicitudModelo } from 'src/app/modelos/solicitud.modelo';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { InmuebleService } from 'src/app/servicios/inmueble.service';
import { SolicitudService } from 'src/app/servicios/solicitud.service';



declare var iniciarSelect: any;

@Component({
  selector: 'app-editar-solicitud',
  templateUrl: './editar-solicitud.component.html',
  styleUrls: ['./editar-solicitud.component.css']
})
export class EditarSolicitudComponent implements OnInit {

  listaClientes: ClienteModelo[] = []
  listaInmuebles: InmuebleModelo[] = []
  listaSolicitudes: SolicitudModelo[] = []

  fgValidador: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder,
    private servicio: SolicitudService,
    private servicioInmuebles: InmuebleService,
    private router: Router,
    private route: ActivatedRoute,
    private servicioClientes: ClienteService) {

  }

  ConstruirFormulario() {
    this.fgValidador = this.fb.group({
      id: ['', []],
      fechaSolicitud: ['', [Validators.required]],
      oferta: ['', [Validators.required]],
      clienteId: ['', [Validators.required]],
      inmuebleId: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.ConstruirFormulario();
    let id = this.route.snapshot.params["id"];
    this.ObtenerRegistroPorId(id);
    this.cargarClientes()
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



  ObtenerRegistroPorId(id: number) {
    this.servicio.BuscarRegistro(id).subscribe((datos) => {
      this.ObtenerFgValidador.id.setValue(datos.id);
      this.ObtenerFgValidador.fechaSolicitud.setValue(datos.fechaSolicitud);
      this.ObtenerFgValidador.oferta.setValue(datos.oferta);
      this.ObtenerFgValidador.clienteId.setValue(datos.clienteId);
      this.ObtenerFgValidador.inmuebleId.setValue(datos.inmuebleId);
      this.ObtenerFgValidador.estadoSolicitudId.setValue(datos.estadoSolicitudId);

    },
      (err) => {
        alert("No se encuentra el registro con id " + id);
      });
  }

  get ObtenerFgValidador() {
    return this.fgValidador.controls;
  }

  ModificarRegistro() {
    let fechaSolicitud = this.ObtenerFgValidador.fechaSolicitud.value;
    let oferta = this.ObtenerFgValidador.oferta.value;
    let clienteId = this.ObtenerFgValidador.clienteId.value;
    let inmuebleId = this.ObtenerFgValidador.inmuebleId.value;
    let alerta = false;
    let id = this.ObtenerFgValidador.id.value;

    this.listaSolicitudes.forEach(function (valor, indice, listaSolicitudes) {
      if (valor.inmuebleId == inmuebleId) {
        alert("El inmueble ya tiene otra solicitud en estudio");
        alerta = true;
      }
    });
    if (alerta == false) {  // Si no se encontró el mismo id del inmueble ya registrado
      let modelo: SolicitudModelo = new SolicitudModelo();

      modelo.id=id;
      modelo.oferta = parseInt(oferta);
      modelo.fechaSolicitud = fechaSolicitud;
      modelo.clienteId = parseInt(clienteId);
      modelo.inmuebleId = parseInt(inmuebleId);
      modelo.estadoSolicitudId = 1; //Se creó en la base de datos el estado de solicitud con ID 1 = En Estudio

      this.servicio.ModificarRegistro(modelo).subscribe(
        (datos) => {
          alert("Registro modificado correctamente.");
          this.router.navigate(["/ventas/listar-solicitud"]);
        },
        (err) => {
          alert("Error modificando el registro");
        }
      );
    }

  }
}
