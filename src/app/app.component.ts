
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { Component } from '@angular/core';
import { UtilitiesService } from './services/utilities.service';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Spinkit } from 'ng-http-loader';
import { OneSignal } from '@ionic-native/onesignal/ngx';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
   styleUrls: ['app.component.scss']
})
export class AppComponent {
  public sinback  :boolean = true;
  spinnerStyle = Spinkit;
  autenticado:boolean=false;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private oneSignal: OneSignal,
    private authenticationService: AuthenticationService,
    private router: Router,private utilities: UtilitiesService
  ) {
    this.initializeApp();
  }
 
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleLightContent();
      this.statusBar.styleDefault();
      if (this.platform.is('android')) {
        this.statusBar.overlaysWebView(false);
        this.statusBar.backgroundColorByHexString('#000000');
       
      }
      if (this.platform.is('cordova')) {
        this.setupPush();
      }
      
      setTimeout(()=>{
        this.splashScreen.hide();
      },4000);
    
      this.router.navigate(['home']);
      this.authenticationService.authenticationState.subscribe(state => {
        if(state){
          this.autenticado=true;
        }
      //  this.router.navigate(['home']);
       /*  if (state) {
          this.router.navigate(['members', 'dashboard']);
        } else {
          this.router.navigate(['home']);
         }*/
      });
 
    });
  }
  setupPush() {
    // I recommend to put these into your environment.ts
    this.oneSignal.startInit('ee98c534-f56e-4223-8076-556a50dc6d09', '36795132540');//YOUR ONESIGNAL APP ID,YOUR ANDROID ID
 
    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
 
    // Notifcation was received in general
    this.oneSignal.handleNotificationReceived().subscribe(data => {
      
      let msg = data.payload.body;
      let title = data.payload.title;
      let additionalData = data.payload.additionalData;
      
   //   this.utilities.presentAlert('info',additionalData.abc,false,0);  
      if(additionalData.route!=''){
        this.router.navigateByUrl(additionalData.route);
      }
    
    });
 
    // Notification was really clicked/opened
    this.oneSignal.handleNotificationOpened().subscribe(data => {
      // Just a note that the data is a different place here!
      let additionalData = data.notification.payload.additionalData;
      if(additionalData.route!=''){
        this.router.navigateByUrl(additionalData.route);
      }
    
   //   this.utilities.presentAlert('info',"You already read this before",false,0);  
   
    });
 
    this.oneSignal.endInit();
    // this.oneSignal.getIds().then((id) => {
    //   this.utilities.presentAlert('success',id.userId,false,0); 
    //   console.log(id);
     
       
    // });
    // this.oneSignal.getIds().then((id) => { // id.userId 
    //   this.utilities.presentAlert('success',id.userId,false,0); 
    //   console.log(id.userId);
    // });
  }
 

 
  
}