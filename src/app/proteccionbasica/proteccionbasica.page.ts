import { Component, OnInit } from '@angular/core';
import { UtilitiesService } from '../services/utilities.service';
declare var jQuery:any;
declare var $:any;
@Component({
  selector: 'app-proteccionbasica',
  templateUrl: './proteccionbasica.page.html',
  styleUrls: ['./proteccionbasica.page.scss'],
})
export class ProteccionbasicaPage implements OnInit {

  title: string;
  constructor(private utilities: UtilitiesService) { 

    this.title = 'PROTECCIÓN BÁSICA';
  }


  ngOnInit() {
  }
  doSomethingOnScroll($event:Event  ){
    this.utilities.doSomethingOnScroll($event);
  }
}
