import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../services/authentication.service';
import { UtilitiesService } from './../services/utilities.service';
// Declaramos las variables para jQuery
declare var jQuery:any;
declare var $:any;
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  public ruta : string = '/login';
  public titulo : string = 'Iniciar Sesion';
  authenticate: boolean = false; 
  constructor(private authService: AuthenticationService,private utilities: UtilitiesService) { }

  ngOnInit() {
    if(this.authService.isAuthenticated()){
     this.authenticate=true;
     this.ruta = '';
     this.titulo  = 'Cerrar Sesion';
  
    }
    console.log();
  }
  onClose(event){
    if ($(event.target).hasClass('nav-menu')){
			$('.navi-menu-button').removeClass('focused');
      $('nav.menu').removeClass('opened');
      $('div.nav-menu').fadeOut(200);
		}
  
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
