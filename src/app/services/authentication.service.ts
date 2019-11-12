import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpRequest, HttpParams, HttpResponse,HttpErrorResponse  } from '@angular/common/http';
import { UtilitiesService } from './utilities.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
declare var jQuery:any;
declare var $:any;
const TOKEN_KEY = 'auth-token';
const CURRENTUSER = 'current';

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
  constructor(private storage: Storage, private plt: Platform,private http: HttpClient,private utilities: UtilitiesService) { 
 
    this.plt.ready().then(() => {
    
      this.checkToken();
      
    });
  }
  url = `${this.utilities.baseApiUrl}api/authentication/login/`;
  login(name,clave) {
      this.data= {
        "name":name,
        "clave":clave
      }
      return this.http.post(`${this.url}`,this.data,this.utilities.httpOptions).pipe(map(user => {
          // login successful if there's a jwt token in the response
          if (user) {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              this.storage.set(TOKEN_KEY, 'KEY');
              this.storage.set(CURRENTUSER, name).then(() => {
                this.authenticationState.next(true);
              });
          }
          return user;
        }));
  }
  checkToken() {
    this.storage.get(TOKEN_KEY).then(res => {
      if (res) {
        this.authenticationState.next(true);
      }
    })
  }
 
  logout() {
    return this.storage.remove(TOKEN_KEY).then(() => {
      
      this.storage.remove(CURRENTUSER);
      this.authenticationState.next(false);
      this.utilities.presentAlert('','Ha Cerrado Sesion','Hasta Luego',['OK'])
    });
  }
 
  isAuthenticated() {
  //  console.log(this.authenticationState.value);
    return this.authenticationState.value;
  }


}
