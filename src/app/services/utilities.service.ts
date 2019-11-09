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
  user='admin';
  pwd='mexico100';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Accept': 'application/json',
      'Authorization':`Basic ${window.btoa(this.user+':'+this.pwd)}`,
      'APIKEY':'CODEX@123',

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
    setTimeout(()=>{
        alert.dismiss();
    }, duration);
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
  peticionHttp(tipo,url,datos){
   
    if(tipo=='post'){
      return this.http.post(`${url}`,datos,this.httpOptions).pipe(map(data => {
        // login successful if there's a jwt token in the response
        if (data) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
        
        }

        return data;
      }));
    }
    if(tipo=='get'){
   //   return this.http.get('https://randomuser.me/api/?results=25');
      return this.http.get(`${url}`,this.httpOptions).pipe(map(data => {
        // login successful if there's a jwt token in the response
        if (data) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
        
        }

        return data;
      }));
    }
  
  
  
  }
}
