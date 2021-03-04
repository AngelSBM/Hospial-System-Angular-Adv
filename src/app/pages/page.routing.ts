import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GraficaComponent } from './grafica/grafica.component';
import { ProgressComponent } from './progress/progress.component';



const routes: Routes = [

    { 
        path:'dashboard', 
        component: PagesComponent,
        children: [
          { path: '', component: DashboardComponent },
          { path: 'grafica1', component: GraficaComponent },
          { path: 'progress', component: ProgressComponent },
        ]
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}