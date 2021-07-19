import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BarraNavegacionSuperiorComponent } from './publico/paginaMaestra/barra-navegacion-superior/barra-navegacion-superior.component';
import { BarraLateralComponent } from './publico/paginaMaestra/barra-lateral/barra-lateral.component';
import { PieDePaginaComponent } from './publico/paginaMaestra/pie-de-pagina/pie-de-pagina.component';
import { InicioComponent } from './publico/inicio/inicio.component';
import { Error404Component } from './publico/errores/error404/error404.component';
import { HttpClientModule} from '@angular/common/http';
import { VentasComponent } from './modulos/ventas/ventas.component';
import { CrearInfoPersonalComponent } from './modulos/Ventas/crear-info-personal/crear-info-personal.component';
import { EditarInfoPersonalComponent } from './modulos/Ventas/editar-info-personal/editar-info-personal.component';
import { CrearInfoFinancieraComponent } from './modulos/Ventas/crear-info-financiera/crear-info-financiera.component';
import { EditarInfoFinancieraComponent } from './modulos/Ventas/editar-info-financiera/editar-info-financiera.component';
import { EliminarInfoFinancieraComponent } from './modulos/Ventas/eliminar-info-financiera/eliminar-info-financiera.component';
import { EliminarInfoPersonalComponent } from './modulos/Ventas/eliminar-info-personal/eliminar-info-personal.component';
import { CrearSolicitudEstudioComponent } from './modulos/Ventas/crear-solicitud-estudio/crear-solicitud-estudio.component';
import { EditarSolicitudEstudioComponent } from './modulos/Ventas/editar-solicitud-estudio/editar-solicitud-estudio.component';
import { EliminarSolicitudEstudioComponent } from './modulos/Ventas/eliminar-solicitud-estudio/eliminar-solicitud-estudio.component';

@NgModule({
  declarations: [
    AppComponent,
    BarraNavegacionSuperiorComponent,
    BarraLateralComponent,
    PieDePaginaComponent,
    InicioComponent,
    Error404Component,
    VentasComponent,
    CrearInfoPersonalComponent,
    EditarInfoPersonalComponent,
    CrearInfoFinancieraComponent,
    EditarInfoFinancieraComponent,
    EliminarInfoFinancieraComponent,
    EliminarInfoPersonalComponent,
    CrearSolicitudEstudioComponent,
    EditarSolicitudEstudioComponent,
    EliminarSolicitudEstudioComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
