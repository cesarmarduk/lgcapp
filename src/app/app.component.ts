
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { Component } from '@angular/core';
 
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
   styleUrls: ['app.component.scss']
})
export class AppComponent {
  public sinback  :boolean = true;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authenticationService: AuthenticationService,
    private router: Router
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
      this.splashScreen.hide();
 
      this.authenticationService.authenticationState.subscribe(state => {
         if (state) {
          this.router.navigate(['members', 'dashboard']);
        } else {
          this.router.navigate(['home']);
         }
      });
 
    });
  }
 
 
  
}