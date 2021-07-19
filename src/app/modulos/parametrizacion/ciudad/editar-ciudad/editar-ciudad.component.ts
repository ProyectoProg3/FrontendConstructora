import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CiudadModelo } from 'src/app/modelos/ciudad.modelo';
import { CiudadService } from 'src/app/servicios/ciudad.service';

@Component({
  selector: 'app-editar-ciudad',
  templateUrl: './editar-ciudad.component.html',
  styleUrls: ['./editar-ciudad.component.css']
})
export class EditarCiudadComponent implements OnInit {

  fgValidador: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder,
    private servicio: CiudadService,
    private router: Router,
    private route: ActivatedRoute) {

  }

  ConstruirFormulario() {
    this.fgValidador = this.fb.group({
      id: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.ConstruirFormulario();
    let id = this.route.snapshot.params["id"];
    this.ObtenerRegistroPorId(id);
  }

  ObtenerRegistroPorId(id: number){
    this.servicio.BuscarRegistro(id).subscribe((datos) =>{
      this.ObtenerFgValidador.nombre.setValue(datos.nombre);
      this.ObtenerFgValidador.id.setValue(datos.id);
    },
    (err) =>{
      alert("No se encuentra el registro con id " + id);
    });
  }

  get ObtenerFgValidador() {
    return this.fgValidador.controls;
  }

  ModificarRegistro() {
    let nom = this.ObtenerFgValidador.nombre.value;
    let id = this.ObtenerFgValidador.id.value;
    let modelo: CiudadModelo = new CiudadModelo();
    modelo.nombre = nom;
    modelo.id = id;
    this.servicio.ModificarRegistro(modelo).subscribe(
      (datos) => {
        alert("Registro modificado correctamente.");
        this.router.navigate(["/parametros/listar-ciudades"]);
      },
      (err) => {
        alert("Error modificando el registro");
      }
    );
  }


}
