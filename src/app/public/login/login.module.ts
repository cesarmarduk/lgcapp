import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LoginPage } from './login.page';

import { SharedModuleModule } from '../../shared-module/shared-module.module';
import { Angular2UsefulSwiperModule } from 'angular2-useful-swiper';
const routes: Routes = [
  {
    path: '',
    component: LoginPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,SharedModuleModule,Angular2UsefulSwiperModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LoginPage]   
})
export class LoginPageModule {}
