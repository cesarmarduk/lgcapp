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
 
  private returnUrl:'/members/dashboard';
  constructor(private authService: AuthenticationService, private router: Router,private utilities: UtilitiesService
        ) {
   
    this.authService.checkToken();
   }
 
  ngOnInit() {
   
  
  }
 

  login() {
    var name,clave;
    name=$('#name').val();
    clave=$('#clave').val();
   this.authService.login(name,clave).pipe(first())
   .subscribe(
       data => {
           this.router.navigateByUrl(this.returnUrl);
           if(data['status']==true){
            this.utilities.presentAlert('','Ha iniciado Sesion',data['message'],['OK'])
           }
       },
       error => {
           this.utilities.presentAlert('','Ha ocurrido un error al Autenticar',error['error'],['OK'])
       });;
  
  }
  doSomethingOnScroll($event:Event  ){
    this.utilities.doSomethingOnScroll($event);
  }
}