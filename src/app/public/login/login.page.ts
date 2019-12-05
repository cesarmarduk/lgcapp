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
      this.utilities.presentAlert('info','No puede dejar vacio el correo',false,0); 
      return false;
    }
    if(this.clave.trim().length==0){
      this.utilities.presentAlert('info','No puede dejar vacia la clave',false,0);
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
            this.utilities.presentAlert('success','Ha iniciado Sesion',false,4000);
           }
       },
       error => {
         console.log(error);
           this.utilities.presentAlert('error','Ha ocurrido un error al Autenticar',false,0);
       });;
  
  }
  doSomethingOnScroll($event:Event  ){
    this.utilities.doSomethingOnScroll($event);
  }
}