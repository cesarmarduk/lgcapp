
import { AuthGuard } from './guards/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

 
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren:  './home/home.module#HomePageModule'  },
  { path: 'login', loadChildren: './public/login/login.module#LoginPageModule' }, 
  { 
    path: 'members', 
    canActivate: [AuthGuard],
    loadChildren: './members/member-routing.module#MemberRoutingModule'
  },
  { path: 'calcular-proteccion', loadChildren: './calcularproteccion/calcularproteccion.module#CalcularproteccionPageModule' },
  { path: 'directo', loadChildren: './directo/directo.module#DirectoPageModule' },
  { path: 'proteccion-total', loadChildren: './protecciontotal/protecciontotal.module#ProtecciontotalPageModule' },
  { path: 'proteccion-basica', loadChildren: './proteccionbasica/proteccionbasica.module#ProteccionbasicaPageModule' },
  { path: 'solicitar-contrato', loadChildren: './solicitarcontrato/solicitarcontrato.module#SolicitarcontratoPageModule' },
  { path: 'credito-hipotecario', loadChildren: './creditohipotecario/creditohipotecario.module#CreditohipotecarioPageModule' },
  { path: 'calcular-credito', loadChildren: './calcularcredito/calcularcredito.module#CalcularcreditoPageModule' },
  { path: 'calcular-irs', loadChildren: './calcularirs/calcularirs.module#CalcularirsPageModule' },
  { path: 'servicios', loadChildren: './servicios/servicios.module#ServiciosPageModule' },
  { path: 'sugerencias', loadChildren: './sugerencias/sugerencias.module#SugerenciasPageModule' },
  { path: 'contacto', loadChildren: './contacto/contacto.module#ContactoPageModule' },





];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }