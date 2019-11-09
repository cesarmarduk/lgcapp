import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../menu/menu.component';
import { FooterComponent } from '../footer/footer.component';
import { NotificationsComponent } from '../notifications/notifications.component';
import { QuickmenuComponent } from '../quickmenu/quickmenu.component';
import { NoticiasComponent } from '../noticias/noticias.component';
import { RouterModule } from '@angular/router';
declare var jQuery:any;
declare var $:any;


@NgModule({
  declarations: [MenuComponent,FooterComponent,NotificationsComponent,QuickmenuComponent,NoticiasComponent],
  imports: [
    CommonModule,RouterModule
  ],
  exports: [ MenuComponent,FooterComponent,NotificationsComponent,QuickmenuComponent,RouterModule,NoticiasComponent ]
})
export class SharedModuleModule { 



}
