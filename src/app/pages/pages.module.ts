import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from '../app-routing.module';


import { ComponentsModule } from '../components/components.module';
import { SharedModule } from '../shared/shared.module';

import { ProgressComponent } from './progress/progress.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GraficaComponent } from './grafica/grafica.component';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantemientos/usuarios/usuarios.component';
import { ImagenUrlPipe } from './pipes/imagen-url.pipe';




@NgModule({
  declarations: [
    ProgressComponent,
    DashboardComponent,
    GraficaComponent,
    PagesComponent,
    AccountSettingsComponent,
    PromesasComponent,
    RxjsComponent,
    PerfilComponent,
    UsuariosComponent,
    ImagenUrlPipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    AppRoutingModule,
    ComponentsModule
  ],
  exports: [
    ProgressComponent,
    DashboardComponent,
    PagesComponent,
    GraficaComponent,
    PagesComponent,
    AccountSettingsComponent
  ]
})
export class PagesModule { }
