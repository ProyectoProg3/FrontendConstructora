import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CiudadService } from 'src/app/servicios/ciudad.service';

@Component({
  selector: 'app-eliminar-ciudad',
  templateUrl: './eliminar-ciudad.component.html',
  styleUrls: ['./eliminar-ciudad.component.css']
})
export class EliminarCiudadComponent implements OnInit {

  listaDatos: String[] =[];
  id: number = 0;

  constructor(
    private servicio: CiudadService,
    private router: Router,
    private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    let id = this.route.snapshot.params["id"];
    this.ObtenerRegistroPorId(id);
  }

  ObtenerRegistroPorId(id: number) {
    this.servicio.BuscarRegistro(id).subscribe((datos) => {
      if (datos.id && datos.nombre) {
        this.listaDatos.push(datos.id?.toString());
        this.listaDatos.push(datos.nombre);
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
        this.router.navigate(["/parametros/listar-ciudades"]);
      },
      (err) => {
        alert("Error eliminando el registro");
      }
    );
  }


}
