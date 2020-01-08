import { Component, OnInit } from '@angular/core';
import { UtilitiesService } from '../services/utilities.service';
declare var jQuery:any;
declare var $:any;
@Component({
  selector: 'app-proteccionglobal',
  templateUrl: './proteccionglobal.page.html',
  styleUrls: ['./proteccionglobal.page.scss'],
})
export class ProteccionglobalPage implements OnInit {
  title: string;
  constructor(private utilities: UtilitiesService) { 

    this.title = 'PROTECCIÓN GLOBAL';
  }


  ngOnInit() {
  }
  doSomethingOnScroll($event:Event  ){
    this.utilities.doSomethingOnScroll($event);
  }

}
