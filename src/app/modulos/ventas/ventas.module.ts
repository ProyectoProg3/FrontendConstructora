import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VentasRoutingModule } from './ventas-routing.module';
import { CrearSolicitudComponent } from './solicitud-estudio/crear-solicitud/crear-solicitud.component';
import { EditarSolicitudComponent } from './solicitud-estudio/editar-solicitud/editar-solicitud.component';
import { EliminarSolicitudComponent } from './solicitud-estudio/eliminar-solicitud/eliminar-solicitud.component';
import { ListarSolicitudComponent } from './solicitud-estudio/listar-solicitud/listar-solicitud.component';
import { CrearInfoPersonalComponent } from './info-personal/crear-info-personal/crear-info-personal.component';
import { EditarInfoPersonalComponent } from './info-personal/editar-info-personal/editar-info-personal.component';
import { EliminarInfoPersonalComponent } from './info-personal/eliminar-info-personal/eliminar-info-personal.component';
import { ListarInfoPersonalComponent } from './info-personal/listar-info-personal/listar-info-personal.component';
import { CrearInfoFinancieraComponent } from './info-financiera/crear-info-financiera/crear-info-financiera.component';
import { EditarInfoFinancieraComponent } from './info-financiera/editar-info-financiera/editar-info-financiera.component';
import { ListarInfoFinancieraComponent } from './info-financiera/listar-info-financiera/listar-info-financiera.component';
import { CrearRegistroPagoComponent } from './registro-pago/crear-registro-pago/crear-registro-pago.component';
import { EditarRegistroPagoComponent } from './registro-pago/editar-registro-pago/editar-registro-pago.component';
import { EliminarRegistroPagoComponent } from './registro-pago/eliminar-registro-pago/eliminar-registro-pago.component';
import { ListarRegistroPagoComponent } from './registro-pago/listar-registro-pago/listar-registro-pago.component';



@NgModule({
  declarations: [

  
    CrearSolicitudComponent,
        EditarSolicitudComponent,
        EliminarSolicitudComponent,
        ListarSolicitudComponent,
        CrearInfoPersonalComponent,
        EditarInfoPersonalComponent,
        EliminarInfoPersonalComponent,
        ListarInfoPersonalComponent,
        CrearInfoFinancieraComponent,
        EditarInfoFinancieraComponent,
        ListarInfoFinancieraComponent,
        CrearRegistroPagoComponent,
        EditarRegistroPagoComponent,
        EliminarRegistroPagoComponent,
        ListarRegistroPagoComponent
  ],
  imports: [
    CommonModule,
    VentasRoutingModule
  ]
})
export class VentasModule { }
