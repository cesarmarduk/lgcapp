import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { DataTablesModule } from 'angular-datatables';
import { AppComponent } from './app.component';
import { LoginPageModule } from './public/login/login.module';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationService } from './services/authentication.service';
import { Network } from '@ionic-native/network/ngx';
import { NgHttpLoaderModule } from 'ng-http-loader';

declare var jQuery:any;
declare var $:any;
@NgModule({
  declarations: [AppComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule, 
    DataTablesModule,
    IonicModule.forRoot(), 
    AppRoutingModule,
    NgHttpLoaderModule.forRoot(),
    IonicStorageModule.forRoot(),
    LoginPageModule
    
  ],
  bootstrap: [AppComponent],
 
  providers: [
    AuthenticationService,
    StatusBar,
    SplashScreen,Network,
    { 
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy 
    }
  ],
  exports: [
    
  ]
})
export class AppModule {

}
