import { Component, OnInit } from '@angular/core';
import { UtilitiesService } from '../services/utilities.service';
declare var jQuery:any;
declare var $:any;
@Component({
  selector: 'app-creditohipotecario',
  templateUrl: './creditohipotecario.page.html',
  styleUrls: ['./creditohipotecario.page.scss'],
})
export class CreditohipotecarioPage implements OnInit {

  title: string;
  constructor(private utilities: UtilitiesService) { 

    this.title = 'CRÉDITO HIPOTECARIO';
  }

  ngOnInit() {
  }

}
