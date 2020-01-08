import { Component, OnInit } from '@angular/core';
import { UtilitiesService } from '../../services/utilities.service';
import { ActivatedRoute, Router } from '@angular/router';
declare var jQuery:any;
declare var $:any;
interface response {
  status:string;
  message:string;
  data:any;

}
@Component({
  selector: 'app-crearincumplimiento',
  templateUrl: './crearincumplimiento.page.html',
  styleUrls: ['./crearincumplimiento.page.scss'],
})
export class CrearincumplimientoPage implements OnInit {
  title: string;
  folio: string;
  polId: number;
  data:any;
  constructor(
    private utilities: UtilitiesService,
    private route: ActivatedRoute,
    private router: Router, private rutaActiva: ActivatedRoute) { 

    this.title = 'GENERAR INCUMPLIMIENTO';

  }

  ngOnInit() {
    this.polId=this.rutaActiva.snapshot.params.pol;
  }
  doSomethingOnScroll($event:Event  ){
    this.utilities.doSomethingOnScroll($event);
  }
  generarIncumplimiento($event:Event  ){
    var polId=this.polId;
    var estadoInc=$('#estado_inc').val();
    var incumple=$('#incumple_inc').val();
    var accion=$('#accion_inc').val();
    var asunto=$('#asunto_inc').val();
    var nombre=$('#nombre_inc').val();
    var telefono=$('#telefono_inc').val();
    var correo=$('#correo_inc').val();
    var observaciones=$('#Observaciones_inc').val();
  
    if(asunto.trim()==''){
      this.utilities.presentAlert('warning','Agregue un asunto, ayuda a agilizar el proceso',false,0); 
      return false;
    }
    if(nombre.trim()==''){
      this.utilities.presentAlert('warning','Agregue su nombre por favor',false,0); 
      return false;
    }
    if(telefono.trim()==''){
      this.utilities.presentAlert('warning','Proporcione un telefono para contacto directo',false,0); 
      return false;
    }
    if(correo.trim()==''){
      this.utilities.presentAlert('warning','Agregue un correo para contacto directo',false,0); 
      return false;
    }
    if(observaciones.trim()==''){
      this.utilities.presentAlert('warning','Agregue observaciones asi sera mas facil resolver su caso',false,0); 
      return false;
    }
    this.data = {
      polId:polId,
      abierto:estadoInc,
      incumple:incumple,
      accion:accion,
      asunto:asunto,
      nombre:nombre,
      telefono:telefono,
      correo:correo,
      observaciones:observaciones
    }
    this.utilities.peticionHttp<response>('post',`${this.utilities.baseApiUrl}api/Polizas/crearIncumplimiento`,this.data).pipe()
    .subscribe(
      data => {
        this.utilities.presentAlert(data.status,data.message,false,4000); 
    },
    error => {
        this.utilities.presentAlert('error','Ha ocurrido un error al enviar peticion',false,0); 

    });
  
  }
}
