import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nuestros-precios',
  templateUrl: './nuestros-precios.page.html',
  styleUrls: ['./nuestros-precios.page.scss'],
})
export class NuestrosPreciosPage implements OnInit {
  title: string;
  constructor() { }

  ngOnInit() {
    this.title='NUESTROS PRECIOS';
  }

}
