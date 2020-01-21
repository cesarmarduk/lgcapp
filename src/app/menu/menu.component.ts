import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../services/authentication.service';
import { UtilitiesService } from './../services/utilities.service';
import { NetworkService } from '../services/network.service';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
// Declaramos las variables para jQuery
declare var jQuery:any;
declare var $:any;
const TOKEN_KEY = 'auth-token';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  public rutaLog : string = '/login';
  public ruta : string = '/login';
  public titulo : string = 'Iniciar Sesion';
  public ruta2 : string = '/solicitar-contrato';
  public lugar : string = 'home';
  isConnected = false;

  authenticate: boolean = true; 
  perfilAsesor:boolean = false;
  perfilInmo:boolean = false;
  perfilPropFis:boolean = false;
  perfilPropMor:boolean = false;
  perfilInqFis:boolean = false;
  perfilInqMor:boolean = false;
  perfilAgente:boolean = false;
  constructor(private authService: AuthenticationService,private utilities: UtilitiesService,private _activatedRoute: ActivatedRoute,private storage: Storage) {
  

   }

  ngOnInit() {
    this.storage.get(TOKEN_KEY).then(res => {
      if (res) {
        this.authenticate=true;
        if(localStorage.getItem('inqfisLog')=='true'){
   
          this.perfilInqFis=true;
        }
        if(localStorage.getItem('inqmorLog')=='true'){
          this.perfilInqMor=true;
     
        }
        if(localStorage.getItem('propfisLog')=='true'){
          this.perfilPropFis=true;
    
        }
        if(localStorage.getItem('propmorLog')=='true'){
          this.perfilPropMor=true;
    
        }
        if(localStorage.getItem('inmobiliariaLog')=='true'){
          this.perfilInmo=true;
      
        }
        if(localStorage.getItem('asesorLog')=='true'){
          this.perfilAsesor=true;
      
        }
        if(localStorage.getItem('agenteLog')=='true'){
          this.perfilAgente=true;
      
        }
      }
    })
    this._activatedRoute.paramMap.subscribe(() => {
      this.verificarAutenticacion();
    })
    
   
  }
  onClose(event){
    this.authService.cerrarMenu();
  }

  
  logout() {
    this.authService.logout().then(() => {
      this.authenticate=false;
    });
  
  }
 
  verificarAutenticacion(){
    if((this.authService.isAuthenticated()==true)){
      if(localStorage.getItem('inqfisLog')=='true'){
        this.authenticate=true;
        this.perfilInqFis=true;
      }
      if(localStorage.getItem('inqmorLog')=='true'){
        this.perfilInqMor=true;
        this.authenticate=true;
      }
      if(localStorage.getItem('propfisLog')=='true'){
        this.perfilPropFis=true;
        this.authenticate=true;
      }
      if(localStorage.getItem('propmorLog')=='true'){
        this.perfilPropMor=true;
        this.authenticate=true;
      }
      if(localStorage.getItem('inmobiliariaLog')=='true'){
        this.perfilInmo=true;
        this.authenticate=true;
      }
      if(localStorage.getItem('asesorLog')=='true'){
        this.perfilAsesor=true;
        this.authenticate=true;
      }
      if(localStorage.getItem('agenteLog')=='true'){
        this.perfilAgente=true;
        this.authenticate=true;
      }
      this.authenticate=true;
      this.rutaLog='';
      this.titulo  = 'Cerrar Sesion';
      this.ruta2='/solicitar-contrato';
    
    }else{
      this.titulo  = 'Iniciar Sesion';
      this.authenticate=false;
      this.rutaLog='/login';
      this.ruta='/login';
      this.ruta2='/solicitar-contrato';
    }
    
  }

    clickMenu(event){
     
      var that =$(event.currentTarget) ;
      if (that.parent().find('ul').length)
      {
        event.preventDefault();
        if (!that.parent().hasClass('active'))
        {
          $('nav.menu ul.main-menu ul').slideUp('fast',function(){
            $('nav.menu ul.main-menu > li').removeClass('active');
          });
          
          $('nav.menu ul li a span').removeClass('fa-angle-up').addClass('fa-angle-down');

          
          that.parent().find('ul').slideDown('fast',function(){
            that.parent().addClass('active');
          });

          that.find('span').removeClass('fa-angle-down').addClass('fa-angle-up');
        }
        else
        {
          
          that.parent().find('ul').slideUp('fast',function(){
            $(this).parent().removeClass('active');
          });
          that.find('span').removeClass('fa-angle-up').addClass('fa-angle-down');
        }
      }
      else
      {
        $('nav.menu ul.main-menu ul').slideUp('fast');
        $('nav.menu ul.main-menu > li').removeClass('active');
     //   that.parent().addClass('active');
      }
	}



}
