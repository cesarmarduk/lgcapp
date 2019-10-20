import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
declare var jQuery:any;
declare var $:any;
@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor (public alertController: AlertController) {


    
   }

   async presentAlert(header,subtitle,message,buttons) {
    const alert = await this.alertController.create({
      header: header,
      subHeader: subtitle,
      message: message,
      buttons: buttons
    });
    await alert.present();
    setTimeout(()=>{
        alert.dismiss();
    }, 1500);
   }

   doSomethingOnScroll($event:Event  ){
      var ele=$event.srcElement as HTMLElement; 
      var scrollOffset = ele.scrollTop;
      $('.no-background').each( function( index, element ){
        if (scrollOffset > 80) {
          element.classList.add("set-bg");
        } else {
        element.classList.remove("set-bg");
        }
      }); 
  }
}
