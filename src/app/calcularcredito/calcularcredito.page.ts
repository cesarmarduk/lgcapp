import { Component, OnInit } from '@angular/core';
import { UtilitiesService } from '../services/utilities.service';
declare var jQuery:any;
declare var $:any;
@Component({
  selector: 'app-calcularcredito',
  templateUrl: './calcularcredito.page.html',
  styleUrls: ['./calcularcredito.page.scss'],
})
export class CalcularcreditoPage implements OnInit {

  title: string;
  constructor(private utilities: UtilitiesService) { 

    this.title = 'CALCULAR CRÉDITO';
  }

  ngOnInit() {
  }
  doSomethingOnScroll($event:Event  ){
    this.utilities.doSomethingOnScroll($event);
  }
  solicitarCredito($event:Event  ){
    this.utilities.presentAlert('success','click en solicitud',false,4000); 
  }
}
