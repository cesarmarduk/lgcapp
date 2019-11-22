import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { NoticiaPage } from './noticia.page';

const routes: Routes = [
  {
    path: '',
    component: NoticiaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,SharedModuleModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NoticiaPage]
})
export class NoticiaPageModule {}
