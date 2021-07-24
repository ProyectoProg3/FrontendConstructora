import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidadorSesionGuard } from 'src/app/guardianes/validador-sesion.guard';
import { CrearInfoFinancieraComponent } from './info-financiera/crear-info-financiera/crear-info-financiera.component';
import { EditarInfoFinancieraComponent } from './info-financiera/editar-info-financiera/editar-info-financiera.component';
import { EliminarInfoFinancieraComponent } from './info-financiera/eliminar-info-financiera/eliminar-info-financiera.component';
import { ListarInfoFinancieraComponent } from './info-financiera/listar-info-financiera/listar-info-financiera.component';
import { InicioVentasComponent } from './inicio-ventas/inicio-ventas.component';
import { CrearSolicitudComponent } from './solicitud-estudio/crear-solicitud/crear-solicitud.component';
import { EditarSolicitudComponent } from './solicitud-estudio/editar-solicitud/editar-solicitud.component';
import { EliminarSolicitudComponent } from './solicitud-estudio/eliminar-solicitud/eliminar-solicitud.component';
import { ListarSolicitudComponent } from './solicitud-estudio/listar-solicitud/listar-solicitud.component';


const routes: Routes = [
  {
  path: 'inicio-ventas',
  component: InicioVentasComponent,
  canActivate: [ValidadorSesionGuard]
  } ,
  {
    path: 'listar-info-financiera',
    component: ListarInfoFinancieraComponent,
    canActivate: [ValidadorSesionGuard]
  },
  {
    path: 'crear-info-financiera',
    component: CrearInfoFinancieraComponent,
    canActivate: [ValidadorSesionGuard]
  }, {
    path: 'editar-info-financiera/:id',
    component: EditarInfoFinancieraComponent,
    canActivate: [ValidadorSesionGuard]
  },
  {
    path: 'eliminar-info-financiera/:id',
    component: EliminarInfoFinancieraComponent,
    canActivate: [ValidadorSesionGuard]
  },
  {
    path: 'crear-solicitud',
    component: CrearSolicitudComponent,
    canActivate: [ValidadorSesionGuard]
  },
  {
    path: 'listar-solicitud',
    component: ListarSolicitudComponent,
    canActivate: [ValidadorSesionGuard]
  },
  {
    path: 'editar-solicitud/:id',
    component: EditarSolicitudComponent,
    canActivate: [ValidadorSesionGuard]
  },
  {
    path: 'eliminar-solicitud/:id',
    component: EliminarSolicitudComponent,
    canActivate: [ValidadorSesionGuard]
  }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VentasRoutingModule { }
