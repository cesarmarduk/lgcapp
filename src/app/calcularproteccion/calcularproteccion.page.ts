import { Component, OnInit } from '@angular/core';
import { UtilitiesService } from '../services/utilities.service';
declare var jQuery:any;
declare var $:any;
interface calculoResponse {
  status:any;
  message:any;
  data:any;
}
@Component({
  selector: 'app-calcularproteccion',
  templateUrl: './calcularproteccion.page.html',
  styleUrls: ['./calcularproteccion.page.scss'],
})
export class CalcularproteccionPage implements OnInit {
  title: string;
  data;
  calculo:any;
  validez:any;
  tipo:string;
  constructor(private utilities: UtilitiesService) { 

    this.title = 'CALCULAR PROTECCIÓN';
  }
  retornarAleatorio() {
    return Math.trunc(Math.random() * 6) + 1;
  }

  ngOnInit() {
  }
  doSomethingOnScroll($event:Event  ){
    this.utilities.doSomethingOnScroll($event);  
  }
  calcularPro($event:Event){
    var tipo_pro=$('#tipo_pro_cal').val();
    var vigencia=$('#vigencia_cal').val();
    var renta=$('#renta_cal').val();
    
    if(tipo_pro.trim().length==0){
      this.utilities.presentAlert('warning','Escoga un Tipo de Proteccion',false,4000);
      return false;
    }
    if(vigencia.trim().length==0){
      this.utilities.presentAlert('warning','Seleccione el rango de vigencia del contrato',false,4000);
      return false;
    }
    if(renta.trim().length==0){
      this.utilities.presentAlert('warning','Escriba un monto de renta para el calculo',false,4000);
      return false;
    }
  

    this.data = {
      tipo_pro:tipo_pro,
      vigencia:vigencia,
      renta:renta,
    
    }
    this.utilities.peticionHttp<calculoResponse>('post',`${this.utilities.baseApiUrl}api/Utilities/calcularProteccion`,this.data).pipe()
    .subscribe(
        data => {
          if(data.data!=''){
            this.calculo=`$ ${data.data}`;
            $(".oculto").css('display','block');
            if(vigencia=='2'){
              vigencia='menos de 3';
          
            }
            this.validez=`Válida por ${vigencia} meses`;
            if(tipo_pro=='1'){
              this.tipo=`PROTECCIÓN BÁSICA`;
            }
            if(tipo_pro=='2'){
              this.tipo=`PROTECCIÓN TOTAL`;
            }
            if(tipo_pro=='16'){
              this.tipo=`PROTECCIÓN GLOBAL`;
            }
            if(tipo_pro=='26'){
              this.tipo=`PROTECCIÓN FULL`;
            }
           
          }
          
       //   this.utilities.presentAlert(data.status,data.message,false,0); 
        },
        error => {
          this.utilities.presentAlert('error','Ha ocurrido un error al enviar peticion',false,0); 
        }
    );
  }
}
