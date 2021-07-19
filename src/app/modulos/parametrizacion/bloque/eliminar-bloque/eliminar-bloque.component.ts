import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BloqueService } from 'src/app/servicios/bloque.service';

@Component({
  selector: 'app-eliminar-bloque',
  templateUrl: './eliminar-bloque.component.html',
  styleUrls: ['./eliminar-bloque.component.css']
})
export class EliminarBloqueComponent implements OnInit {

  listaDatos: String[] =[];
  id: number = 0;

  constructor(
    private servicio: BloqueService,
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
        this.router.navigate(["/parametros/listar-bloques"]);
      },
      (err) => {
        alert("Error eliminando el registro");
      }
    );
  }

}
