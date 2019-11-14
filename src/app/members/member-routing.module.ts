import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
 
const routes: Routes = [
  { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardPageModule' },
  { path: 'crear-solicitud', loadChildren: './crearsolicitud/crearsolicitud.module#CrearsolicitudPageModule' },
  { path: 'crear-incumplimiento', loadChildren: './crearincumplimiento/crearincumplimiento.module#CrearincumplimientoPageModule' },
  { path: 'alertas/agregar', loadChildren: './alertas/agregaralerta/agregaralerta.module#AgregaralertaPageModule' },
  { path: 'alertas', loadChildren: './alertas/alertas.module#AlertasPageModule' },  { path: 'settings', loadChildren: './settings/settings.module#SettingsPageModule' },


];
 
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberRoutingModule { }