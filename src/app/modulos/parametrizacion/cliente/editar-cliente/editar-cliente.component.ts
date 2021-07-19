import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ClienteModelo } from 'src/app/modelos/cliente.modelo';
import { ClienteService } from 'src/app/servicios/cliente.service';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {

  fgValidador: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder,
    private servicio: ClienteService,
    private router: Router,
    private route: ActivatedRoute) {

  }

  ConstruirFormulario() {
    this.fgValidador = this.fb.group({
      id: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      correo: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      fotografia: ['', [Validators.required]],
      fechaNacimiento: ['', [Validators.required]],
      ciudad: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.ConstruirFormulario();
    let id = this.route.snapshot.params["id"];
    this.ObtenerRegistroPorId(id);
  }

  ObtenerRegistroPorId(id: number) {
    this.servicio.BuscarRegistro(id).subscribe((datos) => {
      this.ObtenerFgValidador.nombre.setValue(datos.nombre);
      this.ObtenerFgValidador.apellidos.setValue(datos.apellidos);
      this.ObtenerFgValidador.fotografia.setValue(datos.fotografia);
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
    let nom = this.ObtenerFgValidador.nombre.value;
    let id = this.ObtenerFgValidador.id.value;
    let ape = this.ObtenerFgValidador.apellidos.value;
    let correo = this.ObtenerFgValidador.correo.value;
    let tel = this.ObtenerFgValidador.telefono.value;
    let foto = this.ObtenerFgValidador.fotografia.value;
    let fnac = this.ObtenerFgValidador.fechaNacimiento.value;
    let ciudad = this.ObtenerFgValidador.ciudad.value;
    let dir = this.ObtenerFgValidador.direccion.value;

    let modelo: ClienteModelo = new ClienteModelo();

    modelo.nombre = nom;
    modelo.id = id;
    modelo.apellidos = ape;
    modelo.correo = correo;    
    modelo.telefono = tel;
    modelo.fotografia = foto;
    modelo.fechaNacimiento = fnac;
    modelo.ciudadId = ciudad;
    modelo.direccion = dir;
    
    this.servicio.ModificarRegistro(modelo).subscribe(
      (datos) => {
        alert("Registro modificado correctamente.");
        this.router.navigate(["/parametros/listar-clientes"]);
      },
      (err) => {
        alert("Error modificando el registro");
      }
    );
  }

}
