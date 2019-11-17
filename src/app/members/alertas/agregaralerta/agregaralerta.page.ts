import { Component, OnInit } from '@angular/core';
import { UtilitiesService } from '../../../services/utilities.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-agregaralerta',
  templateUrl: './agregaralerta.page.html',
  styleUrls: ['./agregaralerta.page.scss'],
})
export class AgregaralertaPage implements OnInit {
  title: string;
 
  constructor(
    private utilities: UtilitiesService,
    private route: ActivatedRoute,
    private router: Router) { 

    this.title = 'Agregar Alerta';

  }

  ngOnInit() {
  }
  generarAlerta($event:Event  ){
    this.utilities.presentAlert('','generarAlerta','click en generarAlerta',['OK'])
  }
}
