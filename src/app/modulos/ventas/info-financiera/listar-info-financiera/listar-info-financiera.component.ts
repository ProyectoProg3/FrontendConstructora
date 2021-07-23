import { Component, OnInit } from '@angular/core';
import { DatosGenerales } from 'src/app/config/datos.generales';
import { InfoFinancieraModelo } from 'src/app/modelos/info-financiera.modelo';
import { InfoFinancieraService } from 'src/app/servicios/info-financiera.service';


@Component({
  selector: 'app-listar-info-financiera',
  templateUrl: './listar-info-financiera.component.html',
  styleUrls: ['./listar-info-financiera.component.css']
})
export class ListarInfoFinancieraComponent implements OnInit {

  pagina: number = 1;
  regPorPagina: number = DatosGenerales.numRegistrosPorPagina;
  listaRegistros: InfoFinancieraModelo[] = [];
  constructor(private servicio: InfoFinancieraService) { }

  ngOnInit(): void {
    this.ObtenerListadoInfoFinanciera();
  }

  ObtenerListadoInfoFinanciera() {
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
