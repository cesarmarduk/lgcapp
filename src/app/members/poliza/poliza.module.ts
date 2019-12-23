import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { SharedModuleModule } from '../../shared-module/shared-module.module';
import { IonicModule } from '@ionic/angular';

import { PolizaPage } from './poliza.page';

const routes: Routes = [
  {
    path: '',
    component: PolizaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,SharedModuleModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PolizaPage]
})
export class PolizaPageModule {}
