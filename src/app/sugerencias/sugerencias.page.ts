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

  title:  string;
  nombre: string;
  email: string;
  telefono: string;
  sugerencia: string;

  constructor(private utilities: UtilitiesService) { 

    this.title = 'BUZÓN DE SUGERENCIAS';
  }

  ngOnInit() {
  }
  doSomethingOnScroll($event:Event  ){
    this.utilities.doSomethingOnScroll($event);
  }
  enviarSugerencia(){
    this.nombre=$('#nombre').val();
    this.telefono=$('#telefono').val();
    this.email=$('#email').val();
    this.sugerencia=$('#sugerencia').val();

    if(this.nombre.trim().length==0){
      this.utilities.presentAlert('error','No puede dejar vacio el nombre',false,4000);
      return false;
    }
    if(this.telefono.trim().length==0){
      this.utilities.presentAlert('error','No puede dejar vacio el telefono',false,4000);
      return false;
    }
    if(this.email.trim().length==0){
      this.utilities.presentAlert('error','No puede dejar vacio el email',false,4000);
      return false;
    }
    if(this.sugerencia.trim().length==0){
      this.utilities.presentAlert('error','No puede dejar vacia la sugerencia',false,4000);
      return false;
    }
    this.nombre=this.nombre.trim();
    this.telefono=this.telefono.trim();
    this.email=this.email.trim();
    this.sugerencia=this.sugerencia.trim();
    this.utilities.peticionHttp('post',`${this.utilities.baseApiUrl}api/Utilities/enviarSugerencia`,{'nombre':this.nombre,
                                            'telefono':this.telefono,
                                            'email':this.email,
                                            'sugerencia':this.sugerencia
                                        }).pipe()
    .subscribe(
        data => {
          this.utilities.presentAlert('success','Se ha enviado la informacion',false,0);
         
         
        },
        error => {
          this.utilities.presentAlert('error','Ha ocurrido un error al enviar peticion',false,0);
        
    });
   
  }
}
