import { Component, OnInit } from '@angular/core';
import { UtilitiesService } from '../../services/utilities.service';
declare var jQuery:any;
declare var $:any;
@Component({
  selector: 'app-crearsolicitud',
  templateUrl: './crearsolicitud.page.html',
  styleUrls: ['./crearsolicitud.page.scss'],
})
export class CrearsolicitudPage implements OnInit {

  title: string;
  constructor(private utilities: UtilitiesService) { 

    this.title = 'SOLICITAR CONTRATO';
  }

  ngOnInit() {
  }
  doSomethingOnScroll($event:Event  ){
    this.utilities.doSomethingOnScroll($event);
  }
  crearSolicitud($event:Event  ){
    this.utilities.presentAlert('info','click en crearSolicitud',false,0); 
  
  }
}
