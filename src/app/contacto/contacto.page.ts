import { Component, OnInit } from '@angular/core';
import { UtilitiesService } from '../services/utilities.service';
declare var jQuery:any;
declare var $:any;
@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.page.html',
  styleUrls: ['./contacto.page.scss'],
})
export class ContactoPage implements OnInit {

  title: string;
  nombre: string;
  email: string;
  telefono: string;
  empresa: string;
  constructor(private utilities: UtilitiesService) { 

    this.title = 'CONTÁCTANOS';
  }

  ngOnInit() {
  }
  doSomethingOnScroll($event:Event  ){
    this.utilities.doSomethingOnScroll($event);
  }
  mensajeContacto(){
    this.nombre=$('#nombre').val();
    this.telefono=$('#telefono').val();
    this.email=$('#email').val();
    this.empresa=$('#empresa').val();

    if(this.nombre.trim().length==0){
      this.utilities.presentAlert('info','No puede dejar vacio el nombre',false,4000); 
      return false;
    }
    if(this.telefono.trim().length==0){
      this.utilities.presentAlert('info','No puede dejar vacio el telefono',false,4000); 
      return false;
    }
    if(this.email.trim().length==0){
      this.utilities.presentAlert('info','No puede dejar vacio el email',false,4000); 
      return false;
    }
    if(this.empresa.trim().length==0){
      this.utilities.presentAlert('info','No puede dejar vacia la empresa',false,4000); 
      return false;
    }
    this.nombre=this.nombre.trim();
    this.telefono=this.telefono.trim();
    this.email=this.email.trim();
    this.empresa=this.empresa.trim();
    this.utilities.peticionHttp('post',`${this.utilities.baseApiUrl}api/Utilities/enviarContacto`,{'nombre':this.nombre,
                                            'telefono':this.telefono,
                                            'email':this.email,
                                            'empresa':this.empresa
                                        }).pipe()
    .subscribe(
        data => {
          this.utilities.presentAlert('info','Se ha enviado la informacion',false,4000); 
      
         
        },
        error => {
          this.utilities.presentAlert('error','Ha ocurrido un error al enviar peticion',false,0); 
      
    });
  }
}
