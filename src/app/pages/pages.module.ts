import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { ProgressComponent } from './progress/progress.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GraficaComponent } from './grafica/grafica.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [
    ProgressComponent,
    DashboardComponent,
    GraficaComponent,
    PagesComponent,
  ],
  imports: [
    CommonModule,
    SharedModule ,
    AppRoutingModule
  ],
  exports: [
    ProgressComponent,
    DashboardComponent,
    PagesComponent,
    GraficaComponent
  ]
})
export class PagesModule { }
