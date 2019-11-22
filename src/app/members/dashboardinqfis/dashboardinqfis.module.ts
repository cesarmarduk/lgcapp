import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { IonicModule } from '@ionic/angular';
import { SharedModuleModule } from '../../shared-module/shared-module.module';

import { DashboardinqfisPage } from './dashboardinqfis.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardinqfisPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,DataTablesModule,
    IonicModule,SharedModuleModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DashboardinqfisPage]
})
export class DashboardinqfisPageModule {}
