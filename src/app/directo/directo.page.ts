import { Component, OnInit } from '@angular/core';
import { UtilitiesService } from '../services/utilities.service';
declare var jQuery:any;
declare var $:any;
@Component({
  selector: 'app-directo',
  templateUrl: './directo.page.html',
  styleUrls: ['./directo.page.scss'],
})
export class DirectoPage implements OnInit {

  title: string;
  constructor(private utilities: UtilitiesService) { 

    this.title = 'CONTACTO DIRECTO';
  }

  ngOnInit() {
  }
  doSomethingOnScroll($event:Event  ){
    this.utilities.doSomethingOnScroll($event);  
  }
  llamar(){
    console.log('llamar');
  }
}
