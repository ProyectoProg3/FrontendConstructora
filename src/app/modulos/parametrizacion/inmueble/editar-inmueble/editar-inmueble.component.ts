import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { InmuebleModelo } from 'src/app/modelos/inmueble.modelo';
import { InmuebleService } from 'src/app/servicios/inmueble.service';

@Component({
  selector: 'app-editar-inmueble',
  templateUrl: './editar-inmueble.component.html',
  styleUrls: ['./editar-inmueble.component.css']
})
export class EditarInmuebleComponent implements OnInit {

  fgValidador: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder,
    private servicio: InmuebleService,
    private router: Router,
    private route: ActivatedRoute) {

  }

  ConstruirFormulario() {
    this.fgValidador = this.fb.group({
      id: ['', [Validators.required]],
      identificador: ['', [Validators.required]],
      valor: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.ConstruirFormulario();
    let id = this.route.snapshot.params["id"];
    this.ObtenerRegistroPorId(id);
  }

  ObtenerRegistroPorId(id: number) {
    this.servicio.BuscarRegistro(id).subscribe((datos) => {
      this.ObtenerFgValidador.identificador.setValue(datos.identificador);
      this.ObtenerFgValidador.valor.setValue(datos.valor);
      this.ObtenerFgValidador.id.setValue(datos.id);
    },
      (err) => {
        alert("No se encuentra el registro con id " + id);
      });
  }

  get ObtenerFgValidador() {
    return this.fgValidador.controls;
  }

  ModificarRegistro() {
    let iden = this.ObtenerFgValidador.identificador.value;
    let id = this.ObtenerFgValidador.id.value;
    let val = this.ObtenerFgValidador.valor.value;
    let modelo: InmuebleModelo = new InmuebleModelo();
    modelo.identificador = iden;
    modelo.id = id;
    modelo.valor = val;
    this.servicio.ModificarRegistro(modelo).subscribe(
      (datos) => {
        alert("Registro modificado correctamente.");
        this.router.navigate(["/parametros/listar-inmuebles"]);
      },
      (err) => {
        alert("Error modificando el registro");
      }
    );
  }

}