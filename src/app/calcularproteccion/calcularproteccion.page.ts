import { Component, OnInit } from '@angular/core';
import { UtilitiesService } from '../services/utilities.service';
declare var jQuery:any;
declare var $:any;
@Component({
  selector: 'app-calcularproteccion',
  templateUrl: './calcularproteccion.page.html',
  styleUrls: ['./calcularproteccion.page.scss'],
})
export class CalcularproteccionPage implements OnInit {
  title: string;
  constructor(private utilities: UtilitiesService) { 

    this.title = 'CALCULAR PROTECCIÓN';
  }
  retornarAleatorio() {
    return Math.trunc(Math.random() * 6) + 1;
  }

  ngOnInit() {
  }
  doSomethingOnScroll($event:Event  ){
    this.utilities.doSomethingOnScroll($event);  
  }
  calcular(){
    console.log('calcular');
  }
}
