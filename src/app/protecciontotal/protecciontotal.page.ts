import { Component, OnInit } from '@angular/core';
import { UtilitiesService } from '../services/utilities.service';
declare var jQuery:any;
declare var $:any;
@Component({
  selector: 'app-protecciontotal',
  templateUrl: './protecciontotal.page.html',
  styleUrls: ['./protecciontotal.page.scss'],
})
export class ProtecciontotalPage implements OnInit {

  title: string;
  constructor(private utilities: UtilitiesService) { 

    this.title = 'PROTECCIÓN TOTAL';
  }


  ngOnInit() {
  }

}
