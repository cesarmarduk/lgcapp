import { Component, OnInit } from '@angular/core';
import { UtilitiesService } from '../services/utilities.service';
declare var jQuery:any;
declare var $:any;
interface calculoResponse {
  status:any;
  message:any;
}
@Component({
  selector: 'app-calcularirs',
  templateUrl: './calcularirs.page.html',
  styleUrls: ['./calcularirs.page.scss'],
})
export class CalcularirsPage implements OnInit {
  data:any;
  title: string;
  fechaVent:any;
  fechaAdj:any;
  constructor(private utilities: UtilitiesService) { 

    this.title = 'CALCULAR ISR';
  }

  ngOnInit() {
    this.fechaAdj=this.utilities.getFecha();
    this.fechaVent= this.fechaAdj
   
  }
  doSomethingOnScroll($event:Event  ){
    this.utilities.doSomethingOnScroll($event);
  }
  calcularIrs($event:Event  ){
    var nombre_solicitante=$('#nombre_solicitante_isr').val();
    var inmobiliaria_solicitante=$('#inmobiliaria_solicitante_isr').val();
    var email_solicitante=$('#email_solicitante_isr').val();
    var telefono_solicitante=$('#telefono_solicitante_isr').val();
    var precio_venta=$('#precio_venta_isr').val();
    var fecha_venta=$('#fecha_venta_isr').val();
    var precio_adjudicacion=$('#precio_adjudicacion_isr').val();
    var fecha_adjudicacion=$('#fecha_adjudicacion_isr').val();
    var numero_propietarios=$('#numero_propietarios_isr').val();
    var numero_propietarios_conyugal=$('#numero_propietarios_conyugal_isr').val();
    var numero_propietarios_exentan=$('#numero_propietarios_exentan_isr').val();
    if(nombre_solicitante.trim().length==0){
      this.utilities.presentAlert('warning','Escriba su nombre',false,4000);
      return false;
    }
    if(email_solicitante.trim().length==0){
      this.utilities.presentAlert('warning','Escriba su email',false,4000);
      return false;
    }
    if(telefono_solicitante.trim().length==0){
      this.utilities.presentAlert('warning','Escriba su telefono',false,4000);
      return false;
    }
    if(precio_venta.trim().length==0){
      this.utilities.presentAlert('warning','Ingrese el precio de venta',false,4000);
      return false;
    }
  
    if(precio_adjudicacion.trim().length==0){
      this.utilities.presentAlert('warning','Ingrese el precio de adjudicacion',false,4000);
      return false;
    }

    this.data = {
      nombre_solicitante:nombre_solicitante,
      inmobiliaria_solicitante:inmobiliaria_solicitante,
      email_solicitante:email_solicitante,
      telefono_solicitante:telefono_solicitante,
      precio_venta:precio_venta,
      fecha_venta:fecha_venta,
      precio_adjudicacion:precio_adjudicacion,
      fecha_adjudicacion:fecha_adjudicacion,
      numero_propietarios:numero_propietarios,
      numero_propietarios_conyugal:numero_propietarios_conyugal,
      numero_propietarios_exentan:numero_propietarios_exentan
    }
    this.utilities.peticionHttp<calculoResponse>('post',`${this.utilities.baseApiUrl}api/Utilities/solicitarCalculoIsr`,this.data).pipe()
    .subscribe(
        data => {
      
          this.utilities.presentAlert(data.status,data.message,false,0); 
        },
        error => {
          this.utilities.presentAlert('error','Ha ocurrido un error al enviar peticion',false,0); 
        }
    );
  
  }
}
