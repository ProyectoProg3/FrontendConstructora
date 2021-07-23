import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { InfoFinancieraService } from 'src/app/servicios/info-financiera.service';


@Component({
  selector: 'app-eliminar-info-financiera',
  templateUrl: './eliminar-info-financiera.component.html',
  styleUrls: ['./eliminar-info-financiera.component.css']
})
export class EliminarInfoFinancieraComponent implements OnInit {

  listaDatos: String[] = [];
  id: number = 0;

  constructor(
    private servicio: InfoFinancieraService,
    private router: Router,
    private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    let id = this.route.snapshot.params["id"];
    this.ObtenerRegistroPorId(id);
  }

  ObtenerRegistroPorId(id: number) {
    this.servicio.BuscarRegistro(id).subscribe((datos) => {
      if (datos.id && datos.datosTrabajo) {
        this.listaDatos.push(datos.id?.toString());
        this.listaDatos.push(datos.datosTrabajo.toString());
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
        this.router.navigate(["/ventas/listar-info-financiera"]);
      },
      (err) => {
        alert("Error eliminando el registro");
      }
    );
  }

}
