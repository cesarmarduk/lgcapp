import { Component, OnInit } from '@angular/core';
import { UtilitiesService } from '../../services/utilities.service';
import { ActivatedRoute, Router } from '@angular/router';
declare var jQuery:any;
declare var $:any;
@Component({
  selector: 'app-crearincumplimiento',
  templateUrl: './crearincumplimiento.page.html',
  styleUrls: ['./crearincumplimiento.page.scss'],
})
export class CrearincumplimientoPage implements OnInit {
  title: string;
  folio: string;
  polId: number;
  constructor(
    private utilities: UtilitiesService,
    private route: ActivatedRoute,
    private router: Router) { 

    this.title = 'GENERAR INCUMPLIMIENTO';

  }

  ngOnInit() {
   this.route
    .queryParams
    .subscribe(params => {
      // Defaults to 0 if no query param provided.
      this.folio = params['folio'] || '';
      this.polId = params['polId'] || 0;
    });
  }
  doSomethingOnScroll($event:Event  ){
    this.utilities.doSomethingOnScroll($event);
  }
  generarIncumplimiento($event:Event  ){
    var polId=$('#polId').val();
    var estadoInc=$('#estado_inc').val();
    var incumple=$('#incumple_inc').val();
    var accion=$('#accion_inc').val();
    var asunto=$('#asunto_inc').val();
    var nombre=$('#nombre_inc').val();
    var telefono=$('#telefono_inc').val();
    var correo=$('#correo_inc').val();
    var observaciones=$('#observaciones_inc').val();
  }
}
