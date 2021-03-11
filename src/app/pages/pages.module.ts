import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
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




@NgModule({
  declarations: [
    ProgressComponent,
    DashboardComponent,
    GraficaComponent,
    PagesComponent,
    AccountSettingsComponent,
    PromesasComponent,
    RxjsComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
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
