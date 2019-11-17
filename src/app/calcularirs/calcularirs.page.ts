import { Component, OnInit } from '@angular/core';
import { UtilitiesService } from '../services/utilities.service';
declare var jQuery:any;
declare var $:any;
@Component({
  selector: 'app-calcularirs',
  templateUrl: './calcularirs.page.html',
  styleUrls: ['./calcularirs.page.scss'],
})
export class CalcularirsPage implements OnInit {

  title: string;
  constructor(private utilities: UtilitiesService) { 

    this.title = 'CALCULAR ISR';
  }

  ngOnInit() {
  }
  doSomethingOnScroll($event:Event  ){
    this.utilities.doSomethingOnScroll($event);
  }
  calcularIrs($event:Event  ){
    this.utilities.presentAlert('','calcularIrs','click en calcularIrs',['OK'])
  }
}
