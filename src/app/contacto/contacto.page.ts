import { Component, OnInit } from '@angular/core';
import { UtilitiesService } from '../services/utilities.service';
declare var jQuery:any;
declare var $:any;
@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.page.html',
  styleUrls: ['./contacto.page.scss'],
})
export class ContactoPage implements OnInit {

  title: string;
  constructor(private utilities: UtilitiesService) { 

    this.title = 'CONTÁCTANOS';
  }

  ngOnInit() {
  }

}
