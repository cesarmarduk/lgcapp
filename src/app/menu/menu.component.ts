import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../services/authentication.service';
import { UtilitiesService } from './../services/utilities.service';
import { NetworkService } from '../services/network.service';
import { ActivatedRoute } from '@angular/router';
// Declaramos las variables para jQuery
declare var jQuery:any;
declare var $:any;
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
  authenticate: boolean = false; 
  perfilAsesor:boolean;
  perfilInmo:boolean;
  perfilPropFis:boolean;
  perfilPropMor:boolean;
  perfilInqFis:boolean;
  perfilInqMor:boolean;
  constructor(private authService: AuthenticationService,private utilities: UtilitiesService,private _activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this._activatedRoute.paramMap.subscribe(() => {
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
      if((this.authService.isAuthenticated()==true)){
        
        this.authenticate=true;
        this.rutaLog='';
        this.titulo  = 'Cerrar Sesion';
    
      
        this.ruta2='/members/crear-solicitud';
      }else{
          this.titulo  = 'Iniciar Sesion';
          this.authenticate=false;
          this.rutaLog='/login';
          this.ruta='/login';
          this.ruta2='/solicitar-contrato';
      }
    })
    
   
  }
  onClose(event){
    this.authService.cerrarMenu();
  }

  logout() {
    this.authService.logout();
  }


    clickMenu(event){
     
      var that =$(event.target) ;
      if (that.parent().find('ul:first').length)
      {
        event.preventDefault();
        if (!that.parent().hasClass('active'))
        {
          $('nav.menu ul.main-menu ul').slideUp('fast',function(){
            $('nav.menu ul.main-menu > li').removeClass('active');
          });
          
          $('nav.menu ul li a span').removeClass('fa-angle-up').addClass('fa-angle-down');

          
          that.parent().find('ul:first').slideDown('fast',function(){
            that.parent().addClass('active');
          });

          that.find('span').removeClass('fa-angle-down').addClass('fa-angle-up');
        }
        else
        {
          
          that.parent().find('ul:first').slideUp('fast',function(){
            $(this).parent().removeClass('active');
          });
          that.find('span').removeClass('fa-angle-up').addClass('fa-angle-down');
        }
      }
      else
      {
        $('nav.menu ul.main-menu ul').slideUp('fast');
        $('nav.menu ul.main-menu > li').removeClass('active');
        that.parent().addClass('active');
      }
	}



}
