import { AuthenticationService } from './../../services/authentication.service';
import { UtilitiesService } from './../../services/utilities.service';

import { Component, OnInit,ElementRef } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { first } from 'rxjs/operators';
import { OneSignal } from '@ionic-native/onesignal/ngx';
declare var jQuery:any;
declare var $:any;
interface response {
  cambioStatus:string;
  renovaciones:string;
  seguimiento:string;
  reclamaciones:string;
  avisos:string;
  eventos:string;
  cursos:string;
  webinars:string;
  legales:string;
  radio:string;
  promociones:string;
  publicidad:string;
  status:any;
  message:any;
}
@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  title : string;
  avisos:boolean;
  eventos:boolean;
  cursos:string;
  webinars:boolean;
  legales:boolean;
  radio:boolean;
  promociones:boolean;
  publicidad:boolean;
  data:any;
  inqfisInfo:any;
  inqmorInfo:any;
  propfisInfo:any;
  propmorInfo:any;
  asesorInfo:any;
  agenteInfo:any;
  inmobiliariaInfo:any;
  cambioStatus:string;
  renovaciones:string;
  seguimiento:string;
  reclamaciones:string;
  constructor(private authService: AuthenticationService,
    private utilities: UtilitiesService,
    private http: HttpClient,
    private elRef:ElementRef,
    private oneSignal: OneSignal,
    private router: Router) {
      this.title = 'AJUSTES';
     }


  ngOnInit() {
    this.data= {
    }
    if(localStorage.getItem("asesorLog")=='true'){
      this.asesorInfo=JSON.parse(localStorage.getItem("INFOASESOR"));
      this.data.idAsesor=this.asesorInfo.id;
    }
    if(localStorage.getItem("agenteLog")=='true'){
      this.agenteInfo=JSON.parse(localStorage.getItem("INFOAGENTE"));
      this.data.idAgente=this.agenteInfo.id;
    }
    if(localStorage.getItem("inmobiliariaLog")=='true'){
      this.inmobiliariaInfo=JSON.parse(localStorage.getItem("INFOINMOBILIARIA"));
      this.data.idInmo=this.inmobiliariaInfo.id;
    }
    if(localStorage.getItem("propfisLog")=='true'){
      this.propfisInfo=JSON.parse(localStorage.getItem("INFOPROPFIS"));
      this.data.idPropfis=this.propfisInfo.id;
    }
    if(localStorage.getItem("propmorLog")=='true'){
      this.propmorInfo=JSON.parse(localStorage.getItem("INFOPROPMOR"));
      this.data.idPropmor=this.propmorInfo.id;
    }
    if(localStorage.getItem("inqfisLog")=='true'){
      this.inqfisInfo=JSON.parse(localStorage.getItem("INFOINQFIS"));
      this.data.idInqfis=this.inqfisInfo.id;
    }

    if(localStorage.getItem("inqmorLog")=='true'){
      this.inqmorInfo=JSON.parse(localStorage.getItem("INFOINQMOR"));
      this.data.idInqmor=this.inqmorInfo.id;
    }
    this.utilities.peticionHttp<response>(
      'post',
      `${this.utilities.baseApiUrl}api/Utilities/getInfoAjustes`,
      this.data).pipe()
    .subscribe(
      data => {
        if(data.cambioStatus!=''){
          $('#status').parent('div').addClass('checked');
        }
        if(data.avisos!=''){
          $('#avisos').parent('div').addClass('checked');
        }
        if(data.eventos!=''){
          $('#eventos').parent('div').addClass('checked');
        }
        if(data.cursos!=''){
          $('#cursos').parent('div').addClass('checked');
        }
        if(data.webinars!=''){
          $('#webinars').parent('div').addClass('checked');
        }
        if(data.radio!=''){
          $('#radio').parent('div').addClass('checked');
        }
        if(data.promociones!=''){
          $('#promociones').parent('div').addClass('checked');
        }
        if(data.publicidad!=''){
          $('#publicidad').parent('div').addClass('checked');
        }
        if(data.reclamaciones!=''){
          $('#reclamaciones').parent('div').addClass('checked');
        }
        if(data.seguimiento!=''){
          $('#seguimiento').parent('div').addClass('checked');
        }
        if(data.renovaciones!=''){
          $('#renovaciones').parent('div').addClass('checked');
        }
        if(data.legales!=''){
          $('#legales').parent('div').addClass('checked');
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
      "tipo":tipo
    }
    this.oneSignal.getIds().then((id) => {
      this.data.playerid=id.userId;
      if(localStorage.getItem("asesorLog")=='true'){
        this.asesorInfo=JSON.parse(localStorage.getItem("INFOASESOR"));
        this.data.idAsesor=this.asesorInfo.id;
      }
      if(localStorage.getItem("agenteLog")=='true'){
        this.agenteInfo=JSON.parse(localStorage.getItem("INFOAGENTE"));
        this.data.idAgente=this.agenteInfo.id;
      }
      if(localStorage.getItem("inmobiliariaLog")=='true'){
        this.inmobiliariaInfo=JSON.parse(localStorage.getItem("INFOINMOBILIARIA"));
        this.data.idInmo=this.inmobiliariaInfo.id;
      }
      if(localStorage.getItem("propfisLog")=='true'){
        this.propfisInfo=JSON.parse(localStorage.getItem("INFOPROPFIS"));
        this.data.idPropfis=this.propfisInfo.id;
      }
      if(localStorage.getItem("propmorLog")=='true'){
        this.propmorInfo=JSON.parse(localStorage.getItem("INFOPROPMOR"));
        this.data.idPropmor=this.propmorInfo.id;
      }
      if(localStorage.getItem("inqfisLog")=='true'){
        this.inqfisInfo=JSON.parse(localStorage.getItem("INFOINQFIS"));
        this.data.idInqfis=this.inqfisInfo.id;
      }
  
      if(localStorage.getItem("inqmorLog")=='true'){
        this.inqmorInfo=JSON.parse(localStorage.getItem("INFOINQMOR"));
        this.data.idInqmor=this.inqmorInfo.id;
      }
      this.utilities.peticionHttp<response>(
        'post',
        `${this.utilities.baseApiUrl}api/Utilities/editarAjustes`,
        this.data).pipe()
      .subscribe(
        data => {
        this.utilities.presentAlert(data.status,data.message,false,0);
      },
        error => {
        this.utilities.presentAlert('error','Ha ocurrido un error al enviar peticion',false,0); 
  
      });
    });
   
   
  }
}
