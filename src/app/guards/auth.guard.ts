import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from "@angular/router";
 
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
 
  constructor(public auth: AuthenticationService,public router : Router) {}
 
  canActivate(): boolean {
  
    return this.auth.isAuthenticated();
  }
}