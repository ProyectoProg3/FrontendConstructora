import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SolicitudService } from 'src/app/servicios/solicitud.service';


@Component({
  selector: 'app-eliminar-solicitud',
  templateUrl: './eliminar-solicitud.component.html',
  styleUrls: ['./eliminar-solicitud.component.css']
})
export class EliminarSolicitudComponent implements OnInit {

  listaDatos: String[] = [];
  id: number = 0;

  constructor(
    private servicio: SolicitudService,
    private router: Router,
    private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    let id = this.route.snapshot.params["id"];
    this.ObtenerRegistroPorId(id);
  }

  ObtenerRegistroPorId(id: number) {
    this.servicio.BuscarRegistro(id).subscribe((datos) => {
      if (datos.id && datos.fechaSolicitud && datos.clienteId && datos.inmuebleId) {
        this.listaDatos.push("ID: "+datos.id?.toString());
        this.listaDatos.push("Fecha de solicitud: "+datos.fechaSolicitud);
        this.listaDatos.push("ID del cliente: "+datos.clienteId.toString());
        this.listaDatos.push("ID del inmueble: "+datos.inmuebleId.toString());
        this.id = datos.id;
      }
    },
      (err) => {
        alert("No se encuentra el registro con id " + id);
      });
  }

  EliminarRegistro() {
    let id = this.id;
    this.servicio.EliminarRegistro(id).subscribe(
      (datos) => {
        alert("Registro eliminado correctamente.");
        this.router.navigate(["/ventas/listar-solicitud"]);
      },
      (err) => {
        alert("Error eliminando el registro");
      }
    );
  }

}
