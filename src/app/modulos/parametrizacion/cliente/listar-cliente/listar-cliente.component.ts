import { Component, OnInit } from '@angular/core';
import { DatosGenerales } from 'src/app/config/datos.generales';
import { ClienteModelo } from 'src/app/modelos/cliente.modelo';
import { ClienteService } from 'src/app/servicios/cliente.service';

@Component({
  selector: 'app-listar-cliente',
  templateUrl: './listar-cliente.component.html',
  styleUrls: ['./listar-cliente.component.css']
})
export class ListarClienteComponent implements OnInit {

  pagina: number = 1;
  regPorPagina: number = DatosGenerales.numRegistrosPorPagina;
  listaRegistros: ClienteModelo[] = [];
  constructor(private servicio: ClienteService) { }

  ngOnInit(): void {
    this.ObtenerListadoClientes();
  }

  ObtenerListadoClientes() {
    this.servicio.ListarRegistros().subscribe(
      (datos) => {
        this.listaRegistros = datos;
      },
      (err) => {
        alert("Error cargando el listado de registros");
      }
    );
  }

  CambioPagina(p: number){
    this.pagina = p;
  }

}
