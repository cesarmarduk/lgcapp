import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CalcularirsPage } from './calcularirs.page';
import { SharedModuleModule } from '../shared-module/shared-module.module';

const routes: Routes = [
  {
    path: '',
    component: CalcularirsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,SharedModuleModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CalcularirsPage]
})
export class CalcularirsPageModule {}
