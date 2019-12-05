import { Component, OnInit } from '@angular/core';
import { UtilitiesService } from '../services/utilities.service';
declare var jQuery:any;
declare var $:any;
@Component({
  selector: 'app-solicitarcontrato',
  templateUrl: './solicitarcontrato.page.html',
  styleUrls: ['./solicitarcontrato.page.scss'],
})
export class SolicitarcontratoPage implements OnInit {

  title: string;
  constructor(private utilities: UtilitiesService) { 

    this.title = 'SOLICITAR CONTRATO';
  }
  ngOnInit() {
  }
  solicitarContrato($event:Event  ){
    this.utilities.presentAlert('error','No puede dejar vacia la sugerencia',false,4000);
  }
}
