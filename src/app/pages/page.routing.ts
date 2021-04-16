import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from '../guards/auth.guard';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GraficaComponent } from './grafica/grafica.component';
import { ProgressComponent } from './progress/progress.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';

//Mantenimiento
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component'
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { AdminGuard } from '../guards/admin.guard';



const routes: Routes = [

    { 
        path:'dashboard', 
        component: PagesComponent,
        canActivate: [ AuthGuard ],
        children: [
            { path: '', component: DashboardComponent, data: { titulo:  'dashboard' } },
            { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes de cuenta' } },
            { path: 'buscar/:termino', component: BusquedaComponent, data: { titulo: 'Busqueda' } },
            { path: 'grafica1', component: GraficaComponent, data: { titulo: 'Grafica' } },
            { path: 'progress', component: ProgressComponent, data: { titulo: 'Progreso' } },
            { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' } },
            { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs' } },
            { path: 'perfil', component: PerfilComponent, data: { titulo: 'Perfil de Usuario' } },

            //Mantenimiento
            { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Hospitales de la aplicación' } },
            { path: 'medicos', component: MedicosComponent, data: { titulo: 'Médicos de la aplicación' } },
            { path: 'medicos/:id', component: MedicoComponent, data: { titulo: 'Médicos de la aplicación' } },
            
            //Rutas del admin
            { path: 'usuarios', canActivate: [ AdminGuard ], component: UsuariosComponent, data: { titulo: 'Usuarios de la aplicación' } },
        ]
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
