import { Component, OnInit } from '@angular/core';
import { UtilitiesService } from '../services/utilities.service';
declare var jQuery:any;
declare var $:any;
@Component({
  selector: 'app-proteccionfull',
  templateUrl: './proteccionfull.page.html',
  styleUrls: ['./proteccionfull.page.scss'],
})
export class ProteccionfullPage implements OnInit {
  title: string;
  constructor(private utilities: UtilitiesService) { 

    this.title = 'PROTECCIÓN FULL';
  }


  ngOnInit() {
  }
  doSomethingOnScroll($event:Event  ){
    this.utilities.doSomethingOnScroll($event);
  }
}
