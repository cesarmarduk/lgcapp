import { AuthenticationService } from './../../services/authentication.service';
import { UtilitiesService } from './../../services/utilities.service';

import { Component, OnInit,ElementRef } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { first } from 'rxjs/operators';
import { OneSignal } from '@ionic-native/onesignal/ngx';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  title : string;
  constructor(private authService: AuthenticationService,
    private utilities: UtilitiesService,
    private http: HttpClient,
    private elRef:ElementRef,
    private oneSignal: OneSignal,
    private router: Router) {
      this.title = 'AJUSTES';
     }

  ngOnInit() {
  }
  verIdOneSignal(){
    this.oneSignal.getIds().then((id) => {
      this.utilities.presentAlert('success',id.userId,false,0); 
    
       
    });
  }
}
