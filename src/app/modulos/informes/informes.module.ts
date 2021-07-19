import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InformesRoutingModule } from './informes-routing.module';
import { PagoPorClienteComponent } from './pago-por-cliente/pago-por-cliente.component';
import { VentasComponent } from './ventas/ventas.component';
import { ProyectosPorPaisComponent } from './proyectos-por-pais/proyectos-por-pais.component';


@NgModule({
  declarations: [
    PagoPorClienteComponent,
    VentasComponent,
    ProyectosPorPaisComponent
  ],
  imports: [
    CommonModule,
    InformesRoutingModule
  ]
})
export class InformesModule { }
