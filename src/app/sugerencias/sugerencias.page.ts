import { Component, OnInit } from '@angular/core';
import { UtilitiesService } from '../services/utilities.service';
declare var jQuery:any;
declare var $:any;
@Component({
  selector: 'app-sugerencias',
  templateUrl: './sugerencias.page.html',
  styleUrls: ['./sugerencias.page.scss'],
})
export class SugerenciasPage implements OnInit {

  title: string;
  constructor(private utilities: UtilitiesService) { 

    this.title = 'Buzón de Sugerencias';
  }

  ngOnInit() {
  }

}
