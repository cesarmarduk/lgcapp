import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SolicitarcontratoPage } from './solicitarcontrato.page';
import { SharedModuleModule } from '../shared-module/shared-module.module';
const routes: Routes = [
  {
    path: '',
    component: SolicitarcontratoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,SharedModuleModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SolicitarcontratoPage]
})
export class SolicitarcontratoPageModule {}
