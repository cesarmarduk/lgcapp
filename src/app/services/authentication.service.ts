import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';
import { HttpClient  } from '@angular/common/http';
import { UtilitiesService } from './utilities.service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
declare var jQuery:any;
declare var $:any;
const TOKEN_KEY = 'auth-token';
const ASESOR = 'asesorLog';
const INMOBILIARIA = 'inmobiliariaLog';
const PROPFIS = 'propfisLog';
const PROPMOR = 'propmorLog';
const INQFIS = 'inqfisLog';
const INQMOR = 'inqmorLog';




const CURRENTUSER = 'current';
class datos {
  data: any;
  message:string;
  status:boolean;
}
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  authenticationState = new BehaviorSubject(false);
  retorna;
  results = '';
  message = '';
  status = '';
  data;
  response:any;
  constructor(private storage: Storage, private plt: Platform,private http: HttpClient,private utilities: UtilitiesService,  private router: Router) { 
 
    this.plt.ready().then(() => {
    
      this.checkToken();
      
    });
  }
  url = `${this.utilities.baseApiUrl}api/authentication/login/`;
  login(correo,clave) {
      this.data= {
        "correo":correo,
        "clave":clave
      }
      return this.http.post<datos>(`${this.url}`,this.data,this.utilities.httpOptions).pipe(map(data => {
          // login successful if there's a jwt token in the response
          if (data) {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              this.response=data.data;
              if(this.response.logueado==true){
                this.storage.set(TOKEN_KEY, 'KEY');
                localStorage.setItem(ASESOR,this.response.Asesor);
                if(this.response.Asesor){               
                  localStorage.setItem('INFOASESOR', JSON.stringify(this.response.infoAsesor));
                }
                localStorage.setItem(INMOBILIARIA, this.response.Inmobiliaria);
                if(this.response.Inmobiliaria){                
                  localStorage.setItem('INFOINMOBILIARIA', JSON.stringify(this.response.infoInmobiliaria));
                }
                localStorage.setItem(PROPFIS, this.response.PropF);
                if(this.response.PropF){                
                  localStorage.setItem('INFOPROPFIS', JSON.stringify(this.response.infoPropF));
                }
                localStorage.setItem(PROPMOR, this.response.PropMoral);
                if(this.response.PropMoral){                
                  localStorage.setItem('INFOPROPMOR', JSON.stringify(this.response.infoPropMoral));
                }
                localStorage.setItem(INQFIS, this.response.InqF);
                if(this.response.InqF){                 
                  localStorage.setItem('INFOINQFIS', JSON.stringify(this.response.infoInqF));
                }
                localStorage.setItem(INQMOR, this.response.InqMoral);
                if(this.response.InqMoral){                
                  localStorage.setItem('INFOINQMOR', JSON.stringify(this.response.infoInqMoral));
                }
              }
              this.authenticationState.next(true);
          }
          return data;
        }));
  }
  checkToken() {
    this.storage.get(TOKEN_KEY).then(res => {
      if (res) {
        this.authenticationState.next(true);
      }
    })
  }
  cerrarMenu(){
    if ($('.nav-menu').hasClass('nav-menu')){
      $('.navi-menu-button').removeClass('focused');
      $('nav.menu').removeClass('opened');
      $('div.nav-menu').fadeOut(200);
    }
  }
  logout() {
    return this.storage.remove(TOKEN_KEY).then(() => {
      this.storage.remove(CURRENTUSER);
      this.authenticationState.next(false);
      localStorage.removeItem('INFOASESOR');
      localStorage.removeItem('INFOINMOBILIARIA');
      localStorage.removeItem('INFOPROPFIS');
      localStorage.removeItem('INFOPROPMOR');
      localStorage.removeItem('INFOINQFIS');
      localStorage.removeItem('INFOINQMOR');
      localStorage.removeItem(ASESOR);
      localStorage.removeItem(INMOBILIARIA);
      localStorage.removeItem(PROPFIS);
      localStorage.removeItem(PROPMOR);
      localStorage.removeItem(INQFIS);
      localStorage.removeItem(INQMOR);
      this.utilities.presentAlert('success','Ha Cerrado Sesion',false,4000);
      this.router.navigate(['home']);
      this.cerrarMenu();
      
      $('.ocultaEnlogOut').css('display','none');
      $('.verEnlogOut').css('display','block');

    });
  }
 
  isAuthenticated() {
  //  console.log(this.authenticationState.value);
    return this.authenticationState.value;
  }


}
