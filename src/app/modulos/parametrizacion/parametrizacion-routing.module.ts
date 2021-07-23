import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidadorSesionGuard } from 'src/app/guardianes/validador-sesion.guard';
import { IniciarSesionComponent } from '../seguridad/iniciar-sesion/iniciar-sesion.component';
import { CrearBloqueComponent } from './bloque/crear-bloque/crear-bloque.component';
import { EditarBloqueComponent } from './bloque/editar-bloque/editar-bloque.component';
import { EliminarBloqueComponent } from './bloque/eliminar-bloque/eliminar-bloque.component';
import { ListarBloqueComponent } from './bloque/listar-bloque/listar-bloque.component';
import { CrearCiudadComponent } from './ciudad/crear-ciudad/crear-ciudad.component';
import { EditarCiudadComponent } from './ciudad/editar-ciudad/editar-ciudad.component';
import { EliminarCiudadComponent } from './ciudad/eliminar-ciudad/eliminar-ciudad.component';
import { ListarCiudadComponent } from './ciudad/listar-ciudad/listar-ciudad.component';
import { CrearClienteComponent } from './cliente/crear-cliente/crear-cliente.component';
import { EditarClienteComponent } from './cliente/editar-cliente/editar-cliente.component';
import { EliminarClienteComponent } from './cliente/eliminar-cliente/eliminar-cliente.component';
import { ListarClienteComponent } from './cliente/listar-cliente/listar-cliente.component';
import { InicioParametrizacionComponent } from './inicio-parametrizacion/inicio-parametrizacion.component';
import { CrearInmuebleComponent } from './inmueble/crear-inmueble/crear-inmueble.component';
import { EditarInmuebleComponent } from './inmueble/editar-inmueble/editar-inmueble.component';
import { EliminarInmuebleComponent } from './inmueble/eliminar-inmueble/eliminar-inmueble.component';
import { ListarInmuebleComponent } from './inmueble/listar-inmueble/listar-inmueble.component';
import { CrearPaisComponent } from './pais/crear-pais/crear-pais.component';
import { EditarPaisComponent } from './pais/editar-pais/editar-pais.component';
import { EliminarPaisComponent } from './pais/eliminar-pais/eliminar-pais.component';
import { ListarPaisComponent } from './pais/listar-pais/listar-pais.component';
import { CrearProyectoComponent } from './proyecto/crear-proyecto/crear-proyecto.component';
import { EditarProyectoComponent } from './proyecto/editar-proyecto/editar-proyecto.component';
import { EliminarProyectoComponent } from './proyecto/eliminar-proyecto/eliminar-proyecto.component';
import { ListarProyectoComponent } from './proyecto/listar-proyecto/listar-proyecto.component';

const routes: Routes = [
  {
    path: 'listar-paises',
    component: ListarPaisComponent,
    canActivate: [ValidadorSesionGuard]
  }, {
    path: 'crear-pais',
    component: CrearPaisComponent,
    canActivate: [ValidadorSesionGuard]
  }, {
    path: 'editar-pais/:id',
    component: EditarPaisComponent,
    canActivate: [ValidadorSesionGuard]
  }, {
    path: 'eliminar-pais/:id',
    component: EliminarPaisComponent,
    canActivate: [ValidadorSesionGuard]
  }, {
    path: 'listar-ciudades',
    component: ListarCiudadComponent,
    canActivate: [ValidadorSesionGuard]
  }, {
    path: 'crear-ciudad',
    component: CrearCiudadComponent,
    canActivate: [ValidadorSesionGuard]
  }, {
    path: 'editar-ciudad/:id',
    component: EditarCiudadComponent,
    canActivate: [ValidadorSesionGuard]
  }, {
    path: 'eliminar-ciudad/:id',
    component: EliminarCiudadComponent,
    canActivate: [ValidadorSesionGuard]
  },{
    path: 'listar-bloques',
    component: ListarBloqueComponent,
    canActivate: [ValidadorSesionGuard]
  },{
    path: 'crear-bloque',
    component: CrearBloqueComponent,
    canActivate: [ValidadorSesionGuard]
  }, {
    path: 'editar-bloque/:id',
    component: EditarBloqueComponent,
    canActivate: [ValidadorSesionGuard]
  }, {
    path: 'eliminar-bloque/:id',
    component: EliminarBloqueComponent,
    canActivate: [ValidadorSesionGuard]
  }, {
    path: 'listar-inmuebles',
    component: ListarInmuebleComponent,
    canActivate: [ValidadorSesionGuard]
  }, {
    path: 'crear-inmueble',
    component: CrearInmuebleComponent,
    canActivate: [ValidadorSesionGuard]
  }, {
    path: 'editar-inmueble/:id',
    component: EditarInmuebleComponent,
    canActivate: [ValidadorSesionGuard]
  }, {
    path: 'eliminar-inmueble/:id',
    component: EliminarInmuebleComponent,
    canActivate: [ValidadorSesionGuard]
  }, {
    path: 'listar-proyectos',
    component: ListarProyectoComponent,
    canActivate: [ValidadorSesionGuard]
  }, {
    path: 'crear-proyecto',
    component: CrearProyectoComponent,
    canActivate: [ValidadorSesionGuard]
  }, {
    path: 'editar-proyecto/:id',
    component: EditarProyectoComponent,
    canActivate: [ValidadorSesionGuard]
  }, {
    path: 'eliminar-proyecto/:id',
    component: EliminarProyectoComponent,
    canActivate: [ValidadorSesionGuard]
  },{
    path: 'listar-clientes',
    component: ListarClienteComponent,
    canActivate: [ValidadorSesionGuard]
  },{
    path: 'crear-cliente',
    component: CrearClienteComponent,
    canActivate: [ValidadorSesionGuard]
  }, {
    path: 'editar-cliente/:id',
    component: EditarClienteComponent,
    canActivate: [ValidadorSesionGuard]
  },{
    path: 'inicio-parametrizacion',
    component: InicioParametrizacionComponent,
    canActivate: [ValidadorSesionGuard]
  },{
    path: 'eliminar-cliente/:id',
    component: EliminarClienteComponent,
    canActivate: [ValidadorSesionGuard]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParametrizacionRoutingModule { }
