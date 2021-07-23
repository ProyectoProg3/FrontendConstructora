import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteModelo } from 'src/app/modelos/cliente.modelo';
import { InfoFinancieraModelo } from 'src/app/modelos/info-financiera.modelo';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { InfoFinancieraService } from 'src/app/servicios/info-financiera.service';



declare var iniciarSelect: any;

@Component({
  selector: 'app-crear-info-financiera',
  templateUrl: './crear-info-financiera.component.html',
  styleUrls: ['./crear-info-financiera.component.css']
})
export class CrearInfoFinancieraComponent implements OnInit {

  listaClientes: ClienteModelo[] = []


  fgValidador: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder,
    private servicioClientes: ClienteService,
    private router: Router,
    private servicio: InfoFinancieraService) {

  }

  ConstruirFormulario() {
    this.fgValidador = this.fb.group({
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


  get ObtenerFgValidador() {
    return this.fgValidador.controls;
  }

  GuardarRegistro() {
    let totalIngresos = this.ObtenerFgValidador.totalIngresos.value;
    let datosTrabajo = this.ObtenerFgValidador.datosTrabajo.value;
    let TiempoTrabActual = this.ObtenerFgValidador.TiempoTrabActual.value;
    let nombreRefFamiliar = this.ObtenerFgValidador.nombreRefFamiliar.value;
    let telRefFamiliar = this.ObtenerFgValidador.telRefFamiliar.value;
    let nombreRefPersonal = this.ObtenerFgValidador.nombreRefPersonal.value;
    let telRefPersonal = this.ObtenerFgValidador.telRefPersonal.value;
    let clienteId = this.ObtenerFgValidador.clienteId.value;

   

    let modelo: InfoFinancieraModelo = new InfoFinancieraModelo();

    modelo.totalIngresos = parseInt(totalIngresos);
    modelo.datosTrabajo = datosTrabajo;
    modelo.TiempoTrabActual = TiempoTrabActual;    
    modelo.nombreRefFamiliar = nombreRefFamiliar;
    modelo.telRefFamiliar = telRefFamiliar;
    modelo.nombreRefPersonal = nombreRefPersonal;
    modelo.clienteId = parseInt(clienteId);
    modelo.telRefPersonal = telRefPersonal;


    this.servicio.AlmacenarRegistro(modelo).subscribe(
      (datos) =>{
        alert("Registro almacenado correctamente.");
        this.router.navigate(["/ventas/listar-info-financiera"]);
      },
      (err) =>{
        alert("Error almacenando el registro");
      }
    );
  }

  



}
