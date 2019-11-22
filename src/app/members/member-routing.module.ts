import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
 
const routes: Routes = [
  { path: 'dashboard/asesor', loadChildren: './dashboardasesor/dashboardasesor.module#DashboardasesorPageModule' },
  { path: 'crear-solicitud', loadChildren: './crearsolicitud/crearsolicitud.module#CrearsolicitudPageModule' },
  { path: 'crear-incumplimiento', loadChildren: './crearincumplimiento/crearincumplimiento.module#CrearincumplimientoPageModule' },
  { path: 'alertas/agregar', loadChildren: './alertas/agregaralerta/agregaralerta.module#AgregaralertaPageModule' },
  { path: 'alertas', loadChildren: './alertas/alertas.module#AlertasPageModule' },
  { path: 'settings', loadChildren: './settings/settings.module#SettingsPageModule' },
  { path: 'dashboard/inmobiliaria', loadChildren: './dashboardinmobiliaria/dashboardinmobiliaria.module#DashboardinmobiliariaPageModule' },
  { path: 'dashboard/propfis', loadChildren: './dashboardpropfis/dashboardpropfis.module#DashboardpropfisPageModule' },
  { path: 'dashboard/propmor', loadChildren: './dashboardpropmor/dashboardpropmor.module#DashboardpropmorPageModule' },
  { path: 'dashboard/inqfis', loadChildren: './dashboardinqfis/dashboardinqfis.module#DashboardinqfisPageModule' },
  { path: 'dashboard/inqmor', loadChildren: './dashboardinqmor/dashboardinqmor.module#DashboardinqmorPageModule' },



];
 
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberRoutingModule { }