import { AuthenticationService } from './../../services/authentication.service';
import { UtilitiesService } from './../../services/utilities.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit,ElementRef } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { first } from 'rxjs/operators';
import { OneSignal } from '@ionic-native/onesignal/ngx';
declare var jQuery:any;
declare var $:any;
interface response {
  renovacion_inq:string;
  renovacion_prop:string;
  recordatorio_inq:string;
  confirmacion_prop:string;
  cambio_status_prop:string;
  cambio_status_inq:string;
  seguimiento_prop:string;
  seguimiento_inq:string;
  reclamacion_prop:string;
  reclamacion_inq:string;

  status:any;
  message:any;
}
@Component({
  selector: 'app-avisospoliza',
  templateUrl: './avisospoliza.page.html',
  styleUrls: ['./avisospoliza.page.scss'],
})
export class AvisospolizaPage implements OnInit {
  title : string;
  id:any;
  folio:string;
  data:any;
  inqfisInfo:any;
  inqmorInfo:any;
  propfisInfo:any;
  propmorInfo:any;
  asesorInfo:any;
  inmobiliariaInfo:any;
  renovacion_inq:string;
  renovacion_prop:string;
  recordatorio_inq:string;
  confirmacion_prop:string;

  seguimiento_prop:string;
  seguimiento_inq:string;
  reclamacion_prop:string;
  reclamacion_inq:string;
  cambio_status_prop:string;
  cambio_status_inq:string;
  perfil:any;
  constructor(private authService: AuthenticationService,
    private utilities: UtilitiesService,
    private http: HttpClient,
    private elRef:ElementRef,
    private oneSignal: OneSignal,
    private router: Router,private rutaActiva: ActivatedRoute) {
      this.title = 'AVISOS EN PROTECCIÓN';
     }


  ngOnInit() {
    this.id=this.rutaActiva.snapshot.params.pol;
    this.folio=this.rutaActiva.snapshot.params.folio;
    this.perfil=this.rutaActiva.snapshot.params.perfil;
    this.data= {
      id:this.id
    }
   
 
    this.utilities.peticionHttp<response>(
      'post',
      `${this.utilities.baseApiUrl}api/Polizas/getInfoAjustesPoliza`,
      this.data).pipe()
    .subscribe(
      data => {
        if(this.perfil=="propmor"||this.perfil=="propfis"||this.perfil=="asesor"||this.perfil=="inmobiliaria"||this.perfil=="agente"){
          if(data.cambio_status_prop=='1'){
            $('#cambio_status_prop').parent('div').addClass('checked');
          }
          if(data.renovacion_prop=='1'){
            $('#renovacion_prop').parent('div').addClass('checked');
          }
          if(data.confirmacion_prop=='1'){
            $('#confirmacion_prop').parent('div').addClass('checked');
          }
          if(data.reclamacion_prop=='1'){
            $('#reclamacion_prop').parent('div').addClass('checked');
          }
          if(data.seguimiento_prop=='1'){
            $('#seguimiento_prop').parent('div').addClass('checked');
          }    
        }

        if(this.perfil=="inqmor"||this.perfil=="inqfis"||this.perfil=="asesor"||this.perfil=="inmobiliaria"||this.perfil=="agente"){
          if(data.cambio_status_inq=='1'){
            $('#cambio_status_inq').parent('div').addClass('checked');
          }
          if(data.renovacion_inq=='1'){
            $('#renovacion_inq').parent('div').addClass('checked');
          }     
          if(data.recordatorio_inq=='1'){
            $('#recordatorio_inq').parent('div').addClass('checked');
          }
          if(data.seguimiento_inq=='1'){
            $('#seguimiento_inq').parent('div').addClass('checked');
          }
         
          if(data.reclamacion_inq=='1'){
            $('#reclamacion_inq').parent('div').addClass('checked');
          }
        }
       
      
       
     

       
    });
  }
  verIdOneSignal(){
    this.oneSignal.getIds().then((id) => {
      this.utilities.presentAlert('success',id.userId,false,0); 
    
       
    });
  }

  changeStatus(tipo,event){
   
    var checkeado=$(event.currentTarget).hasClass('checked');
    this.data= {
      "checkeado":checkeado,
      "tipo":tipo,
      "id":this.id
    }
    
    
      this.utilities.peticionHttp<response>(
        'post',
        `${this.utilities.baseApiUrl}api/Polizas/editarAjustesPoliza`,
        this.data).pipe()
      .subscribe(
        data => {
        this.utilities.presentAlert(data.status,data.message,false,0);
      },
        error => {
        this.utilities.presentAlert('error','Ha ocurrido un error al enviar peticion',false,0); 
  
      });
   
   
   
  }
}
