import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CiudadModelo } from 'src/app/modelos/ciudad.modelo';
import { ClienteModelo } from 'src/app/modelos/cliente.modelo';
import { PaisModelo } from 'src/app/modelos/pais.modelo';
import { CiudadService } from 'src/app/servicios/ciudad.service';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { PaisService } from 'src/app/servicios/pais.service';


declare var iniciarSelect: any;

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {

  listaPaises: PaisModelo[] = []
  listaCiudades: CiudadModelo[] = []

  fgValidador: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder,
    private servicio: ClienteService,
    private router: Router,
    private route: ActivatedRoute,
    private servicioPaises: PaisService,
    private servicioCiudades: CiudadService) {

  }

  ConstruirFormulario() {
    this.fgValidador = this.fb.group({
      id: ['', [Validators.required]],
      nombres: ['', [Validators.required]],
      documento: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      correo: ['', [Validators.required]],
      numCelular: ['', [Validators.required]],
      fotografia: ['', [Validators.required]],
      fechaNacimiento: ['', [Validators.required]],
      paisId: ['', [Validators.required]],
      ciudadId: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.ConstruirFormulario();
    let id = this.route.snapshot.params["id"];
    this.ObtenerRegistroPorId(id);
    this.cargarPaises()
  }

  cargarPaises(){
    this.servicioPaises.ListarRegistros().subscribe(
      (datos) => {
        this.listaPaises= datos;
        setTimeout(() => {
          iniciarSelect()
        }, 500);
      }
    )
  }

  cargarCiudadesPorPais(){
    this.servicioCiudades.BuscarRegistroPorIdPais(this.fgValidador.controls.paisId.value).subscribe(
      (datos) => {
        console.log(datos)
        this.listaCiudades= datos;
        setTimeout(() => {
          iniciarSelect()
        }, 500);
      }
    )
  }

  ObtenerRegistroPorId(id: number) {
    this.servicio.BuscarRegistro(id).subscribe((datos) => {
      this.ObtenerFgValidador.nombres.setValue(datos.nombres);
      this.ObtenerFgValidador.documento.setValue(datos.documento);
      this.ObtenerFgValidador.correo.setValue(datos.correo);
      this.ObtenerFgValidador.numCelular.setValue(datos.numCelular);
      this.ObtenerFgValidador.fechaNacimiento.setValue(datos.fechaNacimiento);
      this.ObtenerFgValidador.ciudadId.setValue(datos.ciudadId);
      this.ObtenerFgValidador.direccion.setValue(datos.direccion);
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
    let nom = this.ObtenerFgValidador.nombres.value;
    let id = this.ObtenerFgValidador.id.value;
    let ape = this.ObtenerFgValidador.apellidos.value;
    let doc = this.ObtenerFgValidador.documento.value;
    let correo = this.ObtenerFgValidador.correo.value;
    let tel = this.ObtenerFgValidador.numCelular.value;
    let foto = this.ObtenerFgValidador.fotografia.value;
    let fnac = this.ObtenerFgValidador.fechaNacimiento.value;
    let ciudadId = this.ObtenerFgValidador.ciudadId.value;
    let dir = this.ObtenerFgValidador.direccion.value;

    let modelo: ClienteModelo = new ClienteModelo();

    modelo.nombres = nom;
    modelo.id = id;
    modelo.documento= doc;
    modelo.apellidos = ape;
    modelo.correo = correo;    
    modelo.numCelular = tel;
    modelo.fotografia = foto;
    modelo.fechaNacimiento = fnac;
    modelo.ciudadId = parseInt(ciudadId);
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
