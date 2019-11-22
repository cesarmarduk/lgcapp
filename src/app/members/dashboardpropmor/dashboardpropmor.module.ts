import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { IonicModule } from '@ionic/angular';
import { SharedModuleModule } from '../../shared-module/shared-module.module';
import { DashboardpropmorPage } from './dashboardpropmor.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardpropmorPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,DataTablesModule,
    IonicModule,SharedModuleModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DashboardpropmorPage]
})
export class DashboardpropmorPageModule {}
