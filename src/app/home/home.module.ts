import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { Angular2UsefulSwiperModule } from 'angular2-useful-swiper';

const routes: Routes = [
  {
    path: '',
    component: HomePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,SharedModuleModule,Angular2UsefulSwiperModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HomePage]
})
export class HomePageModule {
   
  constructor() { 
 
  }

  ngOnInit() {
   
  }

 
  
}
