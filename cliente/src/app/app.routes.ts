import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { MascotasComponent } from './pages/mascotas/mascotas.component';
import { authGuard } from './shared/auth/auth.guard';
import { AdoptantesComponent } from './pages/adoptantes/adoptantes.component';
import { AdopcionesComponent } from './pages/adopciones/adopciones.component';

export const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [authGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'mascotas', component: MascotasComponent, canActivate: [authGuard] },
    { path: 'adoptantes', component: AdoptantesComponent, canActivate: [authGuard] },
    { path: 'adopciones', component: AdopcionesComponent, canActivate: [authGuard] },
    { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
