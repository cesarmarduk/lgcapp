import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProteccionbasicaPage } from './proteccionbasica.page';
import { SharedModuleModule } from '../shared-module/shared-module.module';
const routes: Routes = [
  {
    path: '',
    component: ProteccionbasicaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,SharedModuleModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ProteccionbasicaPage]
})
export class ProteccionbasicaPageModule {}
