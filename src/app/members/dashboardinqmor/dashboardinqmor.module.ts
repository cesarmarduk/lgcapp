import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { IonicModule } from '@ionic/angular';
import { SharedModuleModule } from '../../shared-module/shared-module.module';
import { DashboardinqmorPage } from './dashboardinqmor.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardinqmorPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,DataTablesModule,
    IonicModule,SharedModuleModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DashboardinqmorPage]
})
export class DashboardinqmorPageModule {}
