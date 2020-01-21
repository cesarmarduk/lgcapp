import { Component, OnInit, Input } from '@angular/core';
import { UtilitiesService } from '../services/utilities.service';
import { Storage } from '@ionic/storage';
import { ActivatedRoute } from '@angular/router';
// Declaramos las variables para jQuery
declare var jQuery:any;
declare var $:any;
const TOKEN_KEY = 'auth-token';
interface notificaciones {
  id:number;
  title:string;
  body:string;
  fecha:string;
  url:string;
  appurl:string;
}
class response {
  data:any;
}
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {
  @Input() valor: number;
  @Input() lugar: string;
  @Input() bell: boolean;
  @Input() place: boolean;
  @Input() urlAlertas:string;
  autenticado:boolean=false;
  notificaciones:notificaciones;
  constructor(private utilities: UtilitiesService,private storage: Storage,private _activatedRoute: ActivatedRoute) {

   }

  ngOnInit() {
    this.storage.get(TOKEN_KEY).then(res => {
      if (res) {
       this.autenticado=true;
     
      }
    })

    this._activatedRoute.paramMap.subscribe(() => {
      this.storage.get(TOKEN_KEY).then(res => {
        if (res) {
         this.autenticado=true;
        }
      })
    })
  
   this.utilities.peticionHttp<response>('get',`${this.utilities.baseApiUrl}api/Utilities/getNotificationBar`).pipe()
    .subscribe(
        data => {
          this.notificaciones=data.data;
       
         
        },
        error => {
          this.utilities.presentAlert('error','Ha ocurrido un error al enviar peticion',false,0); 
        }
    );
  }

  fadeIn(el){
    el.classList.add('opened');
  
  }
  
 

  onClk(event){
    $('.navi-menu-button').addClass('focused');

    $('div.nav-menu').fadeIn(50,function(e){
      $('nav.menu').addClass('opened');
    });
  }

 

}
