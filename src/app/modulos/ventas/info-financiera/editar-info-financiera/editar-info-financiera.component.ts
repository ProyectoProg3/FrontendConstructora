import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ClienteModelo } from 'src/app/modelos/cliente.modelo';
import { InfoFinancieraModelo } from 'src/app/modelos/info-financiera.modelo';

import { ClienteService } from 'src/app/servicios/cliente.service';
import { InfoFinancieraService } from 'src/app/servicios/info-financiera.service';



declare var iniciarSelect: any;

@Component({
  selector: 'app-editar-info-financiera',
  templateUrl: './editar-info-financiera.component.html',
  styleUrls: ['./editar-info-financiera.component.css']
})
export class EditarInfoFinancieraComponent implements OnInit {

  listaClientes: ClienteModelo[] = []

  fgValidador: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder,
    private servicio: InfoFinancieraService,
    private router: Router,
    private route: ActivatedRoute,
    private servicioClientes: ClienteService) {

  }

  ConstruirFormulario() {
    this.fgValidador = this.fb.group({
      id: ['', []],
      totalIngresos: ['', [Validators.required]],
      datosTrabajo: ['', [Validators.required]],
      TiempoTrabActual: ['', [Validators.required]],
      nombreRefFamiliar: ['', [Validators.required]],
      telRefFamiliar: ['', [Validators.required]],
      nombreRefPersonal: ['', [Validators.required]],
      telRefPersonal: ['', [Validators.required]],
      clienteId: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.ConstruirFormulario();
    let id = this.route.snapshot.params["id"];
    this.ObtenerRegistroPorId(id);
    this.cargarClientes()
  }

  cargarClientes(){
    this.servicioClientes.ListarRegistros().subscribe(
      (datos) => {
        this.listaClientes= datos;
        setTimeout(() => {
          iniciarSelect()
        }, 500);
      }
    )
  }

  ObtenerRegistroPorId(id: number) {
    this.servicio.BuscarRegistro(id).subscribe((datos) => {
      this.ObtenerFgValidador.id.setValue(datos.id);
      this.ObtenerFgValidador.totalIngresos.setValue(datos.totalIngresos);
      this.ObtenerFgValidador.datosTrabajo.setValue(datos.datosTrabajo);
      this.ObtenerFgValidador.TiempoTrabActual.setValue(datos.TiempoTrabActual);
      this.ObtenerFgValidador.nombreRefFamiliar.setValue(datos.nombreRefFamiliar);
      this.ObtenerFgValidador.telRefFamiliar.setValue(datos.telRefFamiliar);
      this.ObtenerFgValidador.nombreRefPersonal.setValue(datos.nombreRefPersonal);
      this.ObtenerFgValidador.clienteId.setValue(datos.clienteId);
      this.ObtenerFgValidador.telRefPersonal.setValue(datos.telRefPersonal);
      
    },
      (err) => {
        alert("No se encuentra el registro con id " + id);
      });
  }

  get ObtenerFgValidador() {
    return this.fgValidador.controls;
  }

  ModificarRegistro() {
    let totalIngresos = this.ObtenerFgValidador.totalIngresos.value;
    let datosTrabajo = this.ObtenerFgValidador.datosTrabajo.value;
    let TiempoTrabActual = this.ObtenerFgValidador.TiempoTrabActual.value;
    let nombreRefFamiliar = this.ObtenerFgValidador.nombreRefFamiliar.value;
    let telRefFamiliar = this.ObtenerFgValidador.telRefFamiliar.value;
    let nombreRefPersonal = this.ObtenerFgValidador.nombreRefPersonal.value;
    let telRefPersonal = this.ObtenerFgValidador.telRefPersonal.value;
    let clienteId = this.ObtenerFgValidador.clienteId.value;
    let id= this.ObtenerFgValidador.id.value;


    let modelo: InfoFinancieraModelo = new InfoFinancieraModelo();

    modelo.totalIngresos = parseInt(totalIngresos);
    modelo.datosTrabajo = datosTrabajo;
    modelo.TiempoTrabActual = TiempoTrabActual;    
    modelo.nombreRefFamiliar = nombreRefFamiliar;
    modelo.telRefFamiliar = telRefFamiliar;
    modelo.nombreRefPersonal = nombreRefPersonal;
    modelo.clienteId = parseInt(clienteId);
    modelo.telRefPersonal = telRefPersonal;
    modelo.id=id;
    
    this.servicio.ModificarRegistro(modelo).subscribe(
      (datos) => {
        alert("Registro modificado correctamente.");
        this.router.navigate(["/ventas/listar-info-financiera"]);
      },
      (err) => {
        alert("Error modificando el registro");
      }
    );
  }

}
