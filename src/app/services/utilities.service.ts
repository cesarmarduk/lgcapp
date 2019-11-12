import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpRequest, HttpParams, HttpResponse,HttpErrorResponse  } from '@angular/common/http';
import { map } from 'rxjs/operators';
declare var jQuery:any;
declare var $:any;
@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {
  public readonly baseApiUrl: string = 'http://192.168.1.102/ApiRestAPP/';
  public readonly user='admin';
  public readonly pwd='mexico100';
  public readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Accept': 'application/json',
      'Authorization':`Basic ${window.btoa(this.user+':'+this.pwd)}`,
      'APIKEY':'CODEX@123'
    })
  };
  constructor (public alertController: AlertController,private http: HttpClient) {
   }

   async presentAlert(header,subtitle,message,buttons,duration=1500) {
    const alert = await this.alertController.create({
      header: header,
      subHeader: subtitle,
      message: message,
      buttons: buttons
    });
    await alert.present();
    if(duration>0){
      setTimeout(()=>{
          alert.dismiss();
      }, duration);
    }
   
   }

   doSomethingOnScroll($event:Event  ){
      var ele=$event.srcElement as HTMLElement; 
      var scrollOffset = ele.scrollTop;
      $('.no-background').each( function( index, element ){
        if (scrollOffset > 70) {
          element.classList.add("set-bg");
        } else {
        element.classList.remove("set-bg");
        }
      }); 
  }
  peticionHttp(tipo,url,datos=null){
    if(tipo=='post'){
      return this.http.post(`${url}`,datos,this.httpOptions).pipe(map(data => {
        return data;
      }));
    }
    if(tipo=='get'){
      return this.http.get(`${url}`,this.httpOptions).pipe(map(data => {
        return data;
      }));
    }
  }
}
