import { AuthenticationService } from '../services/authentication.service';
import { UtilitiesService } from '../services/utilities.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
//import { NetworkService } from '../services/network.service';

// Declaramos las variables para jQuery
declare var jQuery:any;
declare var $:any;
class Slider {
  id: number;
  image: string;

}
class SliderResponse {
  data: any[];
 
}
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
    slidesPerView: 'auto',
    loopedSlides:3,
    loopAdditionalSlides :3,
    loop: false,
    spaceBetween: 0
  };
  public slider1:string='assets/img/slider/1.png';
  public slider2:string='assets/img/slider/2.png';
  public slider3:string='assets/img/slider/3.png';
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
        if(localStorage.getItem('inqfisLog')=='true'){
          this.ruta='/members/dashboard/inqfis';
        }
        if(localStorage.getItem('inqmorLog')=='true'){
          this.ruta='/members/dashboard/inqmor';
        }
        if(localStorage.getItem('propfisLog')=='true'){
          this.ruta='/members/dashboard/propfis';
        }
        if(localStorage.getItem('propmorLog')=='true'){
          this.ruta='/members/dashboard/propmor';
        }
        if(localStorage.getItem('inmobiliariaLog')=='true'){
          this.ruta='/members/dashboard/inmobiliaria';
        }
        if(localStorage.getItem('asesorLog')=='true'){
          this.ruta='/members/dashboard/asesor';
        }
      
        this.ruta2='/members/crear-solicitud';
      }else{
          this.ruta='/login';
          this.ruta2='/solicitar-contrato';
      }
    })

    const that = this;
    this.utilities.peticionHttp<SliderResponse>('get',`${this.utilities.baseApiUrl}api/utilities/getSlider`).pipe(first())
    .subscribe(
      resp => {
          var sliders=resp.data;
          this.slider1=sliders['slider_1'];
          this.slider2=sliders['slider_2'];
          this.slider3=sliders['slider_3'];
        },
        error => {
            this.utilities.presentAlert('info','No se pudo conectar',false,0);  
        });;
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
  
  getTime(){
    var tiempo=new Date().getTime();
    var fecha = new Date(tiempo);
  
    var date = fecha.getDate();
    var month = fecha.getMonth()+1; 
    var year = fecha.getFullYear();
    var hora=fecha.getHours();
    var minutos=fecha.getHours();
    var segundos=fecha.getSeconds();
    var completa=`${date}/${month}/${year} ${hora}:${minutos}:${segundos}`;
   
    this.utilities.peticionHttp('post',`${this.utilities.baseApiUrl}api/utilities/getTime`,{tiempo:completa}).pipe(first())
    .subscribe(
      resp => {
          console.log(resp)
        },
        error => {
            this.utilities.presentAlert('info','No se pudo conectar',false,0);  
        });
   
  }
    doSomethingOnScroll($event:Event  ){

      this.utilities.doSomethingOnScroll($event);
    
    }
}
