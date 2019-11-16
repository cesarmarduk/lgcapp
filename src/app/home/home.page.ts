import { AuthenticationService } from '../services/authentication.service';
import { UtilitiesService } from '../services/utilities.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
//import { NetworkService } from '../services/network.service';

// Declaramos las variables para jQuery
declare var jQuery:any;
declare var $:any;
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  config: any = {
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    centeredSlides: true,
    slidesPerView: 1,
    loop: true,
    spaceBetween: 0
  };
  public ruta : string = '/login';
  public ruta2 : string = '/solicitar-contrato';
  public lugar : string = 'home';
  isConnected = false;

  constructor(private authService: AuthenticationService,private utilities: UtilitiesService,  
              private _activatedRoute: ActivatedRoute) { //,private networkService: NetworkService
  
   
  
   }

  ngOnInit() {
    this._activatedRoute.paramMap.subscribe(() => {
      if((this.authService.isAuthenticated()==true)){
        this.ruta='/members/dashboard';
        this.ruta2='/members/crear-solicitud';
      }else{
          this.ruta='/login';
          this.ruta2='/solicitar-contrato';
      }
    })
  /*  this.networkService.getNetworkStatus().subscribe((connected: boolean) => {
        this.isConnected = connected;
        if (!this.isConnected) {
            console.log('Por favor enciende tu conexión a Internet');
        }
    });*/
  }
 
  simpleNotif() {
    this.utilities.openNotification(
      2,
      'Titulo',
      'Descripcion',
      'icon.jpg'
    );
  }
   
    doSomethingOnScroll($event:Event  ){

      this.utilities.doSomethingOnScroll($event);
    
    }
}
