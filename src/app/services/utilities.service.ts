
import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { LocalNotifications,ILocalNotification  } from '@ionic-native/local-notifications/ngx';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpRequest, HttpParams, HttpResponse,HttpErrorResponse  } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Platform } from '@ionic/angular';
import { identifierName } from '@angular/compiler';
import swal from'sweetalert2';
declare var jQuery:any;
declare var $:any;
declare var require: any;
const Swal = require('sweetalert2');
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
  public readonly baseApiUrl: string = 'https://app.legalglobalconsulting.com/'; // https://app.legalglobalconsulting.com/  http://localhost/ApiRestAPP/  
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

   async presentAlert(icon,message,showConfirmButton=true,timer=1500) {
     /*
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
    }*/
    Swal.fire({    
      text: message,
      icon: icon,
      showConfirmButton: showConfirmButton,
      timer:timer
    })
    
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
      $('.fa-arrow-left').each( function( index, element ){
        if (scrollOffset > 70) {
          element.classList.add("seeArrow");
        } else {
          element.classList.remove("seeArrow");
        }
      }); 
  }
  peticionHttp<tipo>(tipo,url,datos=null){
    if(tipo=='post'){
      return this.http.post<tipo>(`${url}`,datos,this.httpOptions).pipe(map(data => {
        return data;
      }));
    }
    if(tipo=='get'){
      return this.http.get<tipo>(`${url}`,this.httpOptions).pipe(map(data => {
        return data;
      }));
    }
  }
  openNotification(id,title,text,icon,time=null,attachments=null,data=null){
  //  var at=new Date(new Date().getTime() + 1000);
   // if(time!=null){
    //  time=new Date(time).getTime();
     var at=new Date(time + 1000);
   // }
    this.localNotifications.schedule({
      id: id,
      title: title,
      text: text,
      sound: true ? 'file://assets/sounds/when.mp3': 'file://assets/sounds/when.m4r',//this.isAndroid 
      data: data,
      icon: 'file://assets/img/icono.png',
      smallIcon:'res://my_notification_icon.png',
      trigger: { at: at },
      foreground:true,    
      clock:true,
      vibrate:true,
      color:'#58110F',
      attachments: attachments

     });
  }
  cancelNotification(id){

  }

  format (datos) {
    // `d` is the original data object for the row
    var propietarios=`Sin Informacion`;
        if(datos.propietarios){
          propietarios='';
          $.each(datos.propietarios,function(i, val){
            propietarios+=val;
          });
        }
    var inquilinos=`Sin Informacion`;
        if(datos.inquilinos){
          inquilinos='';
          $.each(datos.inquilinos,function(i, val){
            inquilinos+=val;
          });
        }
    var garantes=`Sin Informacion`;
        if(datos.garantes){
          garantes='';
          $.each(datos.garantes,function(i, val){
            garantes+=val;
          });
        }
    return `<tr id="child_${datos.id}" style="display:none">
              <td colspan="6" >
                <div class="row">
                  <div class="col-6 text-left borde-bajo-punteado">
                      <b>Incumplimientos:</b> ${datos.incumplimientos} <a style="float:right" data-folio="${datos.folio}" data-id="${datos.id}" class="nuevo-inc" href="Javascript:void(0)" >+ Nuevo</a>
                  </div>
                  <div class="col-6 text-letf"></div>
                  <div class="col-7 text-left borde-bajo-punteado">
                      <b>Fecha de Firma:</b> ${datos.fecha_firma} <a style="float:right" data-folio="${datos.folio}" data-id="${datos.id}" class="nueva-alerta" href="Javascript:void(0)" >Alerta</a>
                  </div>
                  <div class="col-5 text-letf"></div>
                  <div class="col-6 text-left borde-bajo-punteado" >
                      <b>Inicio:</b> ${datos.fecha_inicio}
                  </div>
                  <div class="col-6 text-left borde-bajo-punteado">
                      <b>Vencimiento:</b> ${datos.fecha_termino}
                  </div>
                  <div class="col-6 text-left borde-bajo-punteado">
                      <b>Ejecutivo:</b> ${datos.ejecutivo} 
                  </div>
                  <div class="col-6 text-left borde-bajo-punteado">
                      <b>Asesor:</b>  ${datos.asesor}
                  </div>
                  <div class="col-12 text-left borde-bajo-punteado">
                  <b>Dirección:</b>
                      <div class="col-12 ">
                        ${datos.direccion}
                      </div>
                  </div>
                  <div class="col-12 text-left borde-bajo-punteado">
                  <b>Propietarios:</b>
                      <div class="col-12 ">
                        ${propietarios}
                      </div>
                  </div>
                  <div class="col-12 text-left borde-bajo-punteado">
                  <b>Inquilinos:</b>
                      <div class="col-12 ">
                        ${inquilinos}
                      </div>
                  </div>
                  <div class="col-12 text-left borde-bajo-punteado">
                  <b>Garantes:</b>
                      <div class="col-12 ">
                        ${garantes}
                       
                      </div>
                  </div>
                </div>
                <div class="form-divider"></div>
                <div class="row">
                  <div class="col-12 text-left">
                    <div class="col-8 ">
                      <a style="text-align: center" href="Javascript:void(0);" class="button circle inline red">Boton</a> 
                    </div>
                  </div>
                </div>
                <div class="form-divider"></div>
              </td>
            
              
            </tr>`;
}

}
