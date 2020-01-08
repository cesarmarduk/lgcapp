import { Component, OnInit } from '@angular/core';
import { UtilitiesService } from '../services/utilities.service';
import { ActivatedRoute, Params } from '@angular/router';
import { first } from 'rxjs/operators';
declare var jQuery:any;
declare var $:any;


class notiResponse {
  data: any;
}

interface notificacion {
  id:number;
  title:string;
  body:string;
  fecha:string;
  url:string;
  appurl:string;
}
@Component({
  selector: 'app-notificacion',
  templateUrl: './notificacion.page.html',
  styleUrls: ['./notificacion.page.scss'],
})
export class NotificacionPage implements OnInit {
  notificacion:notificacion;
  id:number;
  title:string;
  body:string;
  fecha:string;
  url:string;
  appurl:string;
  constructor(private utilities: UtilitiesService,private rutaActiva: ActivatedRoute) { }

  ngOnInit() {
    const that = this;
    that.id=that.rutaActiva.snapshot.params.id;
  
    this.utilities.peticionHttp<notiResponse>('get',`${this.utilities.baseApiUrl}api/Utilities/getNotificationId/${that.id}`).pipe(first())
    .subscribe(
      data => {
      
        that.title=data.data.title;
        that.body = data.data.body;
        that.fecha = data.data.fecha;
      },
      error => {
            this.utilities.presentAlert('info','Error al Obtener Datos, Comprueba tu conexión a internet :(',false,0);  
      }
    );
  }
  doSomethingOnScroll($event:Event  ){
    this.utilities.doSomethingOnScroll($event);
  }
}
