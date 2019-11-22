import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { IonicModule } from '@ionic/angular';

import { DashboardasesorPage } from './dashboardasesor.page';


import { SharedModuleModule } from '../../shared-module/shared-module.module';
const routes: Routes = [
  {
    path: '',
    component: DashboardasesorPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,DataTablesModule,
    IonicModule,SharedModuleModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DashboardasesorPage]
})
export class DashboardasesorPageModule {

  
}
