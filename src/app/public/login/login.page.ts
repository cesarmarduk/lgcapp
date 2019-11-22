import { AuthenticationService } from './../../services/authentication.service';
import { UtilitiesService } from './../../services/utilities.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { ɵINTERNAL_BROWSER_PLATFORM_PROVIDERS } from '@angular/platform-browser';
declare var jQuery:any;
declare var $:any;
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  url:string;
  correo:string;
  clave:string;
  bellHide:boolean=true;
  constructor(private authService: AuthenticationService, private router: Router,private utilities: UtilitiesService
        ) {
   
    this.authService.checkToken();
   }
 
  ngOnInit() {
   
  
  }
 

  login() {
   
    this.correo=$('#name').val();
    this.clave=$('#clave').val();
    if(this.correo.trim().length==0){
      this.utilities.presentAlert('','Campos Vacios','No puede dejar vacio el correo',['OK'],4000);
      return false;
    }
    if(this.clave.trim().length==0){
      this.utilities.presentAlert('','Campos Vacios','No puede dejar vacia la clave',['OK'],4000);
      return false;
    }
   this.authService.login(this.correo,this.clave).pipe(first())
   .subscribe(
       data => {
        if(localStorage.getItem('inqfisLog')=='true'){
          this.url='/members/dashboard/inqfis';
        }
        if(localStorage.getItem('inqmorLog')=='true'){
          this.url='/members/dashboard/inqmor';
        }
        if(localStorage.getItem('propfisLog')=='true'){
          this.url='/members/dashboard/propfis';
        }
        if(localStorage.getItem('propmorLog')=='true'){
          this.url='/members/dashboard/propmor';
        }
        if(localStorage.getItem('inmobiliariaLog')=='true'){
          this.url='/members/dashboard/inmobiliaria';
        }
        if(localStorage.getItem('asesorLog')=='true'){
          this.url='/members/dashboard/asesor';
        }
        this.router.navigateByUrl(this.url);
           if(data['status']==true){
            this.utilities.presentAlert('','Ha iniciado Sesion',data['message'],['OK'])
           }
       },
       error => {
         console.log(error);
           this.utilities.presentAlert('','Ha ocurrido un error al Autenticar',error['error'],['OK'])
       });;
  
  }
  doSomethingOnScroll($event:Event  ){
    this.utilities.doSomethingOnScroll($event);
  }
}