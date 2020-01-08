import { Component, OnInit } from '@angular/core';
import { UtilitiesService } from '../services/utilities.service';
import { ActivatedRoute, Params } from '@angular/router';
import { first } from 'rxjs/operators';
declare var jQuery:any;
declare var $:any;

class notiResponse {
  data: any;
}

interface notificaciones {
  id:number;
  title:string;
  body:string;
  fecha:string;
  url:string;
  appurl:string;
}
@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.page.html',
  styleUrls: ['./notificaciones.page.scss'],
})
export class NotificacionesPage implements OnInit {
  notificaciones:notificaciones;
  constructor(private utilities: UtilitiesService) {

  }
  ngOnInit() {
    this.utilities.peticionHttp<notiResponse>('get',`${this.utilities.baseApiUrl}api/Utilities/getNotifications`).pipe()
    .subscribe(
        data => {
          this.notificaciones=data.data;
         
        },
        error => {
          this.utilities.presentAlert('error','Ha ocurrido un error al enviar peticion',false,0); 
        }
    );
  }
  doSomethingOnScroll($event:Event  ){
    this.utilities.doSomethingOnScroll($event);
  }
}
