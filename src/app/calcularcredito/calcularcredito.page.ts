import { Component, OnInit } from '@angular/core';
import { UtilitiesService } from '../services/utilities.service';
declare var jQuery:any;
declare var $:any;
interface response {
  status:string;
  message:string;
  data:any;
  mensualidad:any;
  ingreso_min:any;
  calculo:boolean;
}
@Component({
  selector: 'app-calcularcredito',
  templateUrl: './calcularcredito.page.html',
  styleUrls: ['./calcularcredito.page.scss'],
})
export class CalcularcreditoPage implements OnInit {
  data:any;
  title: string;
  mensualidad:any=0;
  ingreso_min:any=0;
  plazo_credito:any;
  constructor(private utilities: UtilitiesService) { 

    this.title = 'TU HIPOTECA FÁCIL';
  }

  ngOnInit() {
  }
  doSomethingOnScroll($event:Event  ){
    this.utilities.doSomethingOnScroll($event);
  }
  calcularCredito($event:Event  ){
  
    var valor_vivienda=$('#valor_vivienda').val();
    var credito_deseado=$('#credito_deseado').val();
    var plazo_credito=$('#plazo_credito').val();
    var nombre=$('#nombre_asesoria').val();
    var telefono=$('#telefono_asesoria').val();
    var email=$('#email_asesoria').val();
    if(nombre.trim()==''){
      this.utilities.presentAlert('warning','Agregue su nombre',false,0); 
      return false;
    }
    if(telefono.trim()==''){
      this.utilities.presentAlert('warning','Agregue un telefono para contacto',false,0); 
      return false;
    }
    if(email.trim()==''){
      this.utilities.presentAlert('warning','Proporcione su correo electronico',false,0); 
      return false;
    }
    if(valor_vivienda.trim()==''){
      this.utilities.presentAlert('warning','Debe agregar el valor de la vivienda',false,0); 
      return false;
    }
    if(credito_deseado.trim()==''){
      this.utilities.presentAlert('warning','Ingrese el Credito Deseado',false,0); 
      return false;
    }
    if(plazo_credito.trim()==''){
      this.utilities.presentAlert('warning','Escoga un plazo para el credito',false,0); 
      return false;
    }
    this.data = {
      plazo_credito:plazo_credito,
      credito_deseado:credito_deseado,
      valor_vivienda:valor_vivienda,
      nombre:nombre,
      telefono:telefono,
      email:email
    }
    this.utilities.peticionHttp<response>('post',`${this.utilities.baseApiUrl}api/Utilities/calcularCredito`,this.data).pipe()
    .subscribe(
      data => {
        if(data.calculo==true){
          $('.escondido').css('display','block');
          this.mensualidad=data.mensualidad+' MXN';
          this.ingreso_min=data.ingreso_min+' MXN';
          this.plazo_credito=plazo_credito+' años';
        }
        $('.mensaje').html(data.message);
       // this.utilities.presentAlert(data.status,data.message,false,4000); 
       
    },
    error => {
        this.utilities.presentAlert('error','Ha ocurrido un error al enviar peticion',false,0); 

    });
   
  
  }
  solicitarAsesoria($event:Event  ){
  
    var nombre=$('#nombre_asesoria').val();
    var telefono=$('#telefono_asesoria').val();
    var email=$('#email_asesoria').val();
    if(nombre.trim()==''){
      this.utilities.presentAlert('warning','Agregue su nombre',false,0); 
      return false;
    }
    if(telefono.trim()==''){
      this.utilities.presentAlert('warning','Agregue un telefono para contacto',false,0); 
      return false;
    }
    if(email.trim()==''){
      this.utilities.presentAlert('warning','Proporcione su correo electronico',false,0); 
      return false;
    }
    this.data = {
      nombre:nombre,
      telefono:telefono,
      email:email
    }
    this.utilities.peticionHttp<response>('post',`${this.utilities.baseApiUrl}api/Utilities/solicitarSesoria`,this.data).pipe()
    .subscribe(
      data => {
      
        this.utilities.presentAlert(data.status,data.message,false,4000); 
       
    },
    error => {
        this.utilities.presentAlert('error','Ha ocurrido un error al enviar peticion',false,0); 

    });
   
  
  }
}
