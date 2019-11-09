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

    this.title = 'Buzón de Sugerencias';
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
      this.utilities.presentAlert('','Error','No puede dejar vacio el nombre',['OK'],4000);
      return false;
    }
    if(this.telefono.trim().length==0){
      this.utilities.presentAlert('','Error','No puede dejar vacio el telefono',['OK'],4000);
      return false;
    }
    if(this.email.trim().length==0){
      this.utilities.presentAlert('','Error','No puede dejar vacio el email',['OK'],4000);
      return false;
    }
    if(this.sugerencia.trim().length==0){
      this.utilities.presentAlert('','Error','No puede dejar vacia la sugerencia',['OK'],4000);
      return false;
    }
    this.nombre=this.nombre.trim();
    this.telefono=this.telefono.trim();
    this.email=this.email.trim();
    this.sugerencia=this.sugerencia.trim();
    this.utilities.peticionHttp('post','http://localhost/ApiRestAPP/api/Utilities/enviarSugerencia',{'nombre':this.nombre,
                                            'telefono':this.telefono,
                                            'email':this.email,
                                            'sugerencia':this.sugerencia
                                        }).pipe()
    .subscribe(
        data => {
          this.utilities.presentAlert('','Se ha enviado la informacion',data['message'],['OK'],4000)
         
        },
        error => {
            this.utilities.presentAlert('','Ha ocurrido un error al enviar peticion',error['error'],['OK'],4000)
    });
    /*
    this.utilities.peticionHttp('get','http://localhost/ApiRestAPP/api/Utilities/obtenerDatos','').pipe()
    .subscribe(
      data => {
      console.log(data);
      // this.router.navigateByUrl(this.returnUrl);
      //   if(data['status']==true){
      //    this.utilities.presentAlert('','Ha iniciado Sesion',data['message'],['OK'])
      //   }
      },
      error => {
        this.utilities.presentAlert('','Ha ocurrido un error al enviar peticion',error['error'],['OK'])
    });
  
   
  */
  }
}
