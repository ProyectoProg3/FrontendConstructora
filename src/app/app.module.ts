import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BarraNavegacionSuperiorComponent } from './publico/paginaMaestra/barra-navegacion-superior/barra-navegacion-superior.component';
import { BarraLateralComponent } from './publico/paginaMaestra/barra-lateral/barra-lateral.component';
import { PieDePaginaComponent } from './publico/paginaMaestra/pie-de-pagina/pie-de-pagina.component';

@NgModule({
  declarations: [
    AppComponent,
    BarraNavegacionSuperiorComponent,
    BarraLateralComponent,
    PieDePaginaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
