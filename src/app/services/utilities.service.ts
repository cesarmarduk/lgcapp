import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { LocalNotifications,ILocalNotification  } from '@ionic-native/local-notifications/ngx';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpRequest, HttpParams, HttpResponse,HttpErrorResponse  } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Platform } from '@ionic/angular';
import { identifierName } from '@angular/compiler';
declare var jQuery:any;
declare var $:any;
@Injectable({
  providedIn: 'root'
})
/*
'Content-Type':  'application/json',
      'Accept': 'application/json',
{
  "/ApiRestApp/*": {
    "target": "http://localhost",
    "secure": false,
    "changeOrigin": true
  }
}


{
  "/*": {
    "target": "https://app.legalglobalconsulting.com/",
    "secure": false,
    "changeOrigin": true
  }
}

*/
export class UtilitiesService {
  public readonly baseApiUrl: string = 'http://192.168.1.100/ApiRestAPP/'; // https://app.legalglobalconsulting.com/  http://localhost/ApiRestAPP/  
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


  repeat: 'daily' | 'friday' = 'friday';
  notifyAt: string;
  isCordova: boolean;
  isAndroid: boolean;


  constructor (public alertController: AlertController,private http: HttpClient,private localNotifications: LocalNotifications,private platform: Platform) {
    this.isCordova = this.platform.is('cordova');
    this.isAndroid = this.platform.is('android');
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
  openNotification(id,title,text,icon,time=null,data=null){
    console.log(new Date().getTime());
    var at=new Date(new Date().getTime() + 1000);
    if(time!=null){
      at=new Date(time + 1000);
    }
    this.localNotifications.schedule({
      id: id,
      title: title,
      text: text,
      sound: this.isAndroid ? 'file://sound.mp3': 'file://beep.caf',
      data: data,
      icon: icon,
      trigger: { at: new Date(new Date().getTime() + 5000) },
     });
  }
  cancelNotification(id){

  }
}
