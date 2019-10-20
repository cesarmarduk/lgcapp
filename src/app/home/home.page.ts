import { AuthenticationService } from '../services/authentication.service';
import { UtilitiesService } from '../services/utilities.service';
import { Component, OnInit } from '@angular/core';
// Declaramos las variables para jQuery
declare var jQuery:any;
declare var $:any;
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public ruta : string = '/login';
  public lugar : string = 'home';
  constructor(private authService: AuthenticationService,private utilities: UtilitiesService) {
  
   
   }

  ngOnInit() {
   
    if((this.authService.isAuthenticated()==true)){
      console.log(this.authService.isAuthenticated());
      this.ruta='/members/dashboard';

    }
  }
 
  
   
    doSomethingOnScroll($event:Event  ){

      this.utilities.doSomethingOnScroll($event);
    //   var ele=$event.srcElement as HTMLElement; 
    //   var scrollOffset = ele.scrollTop;
    //  // let scrollOffset = $event.srcElement.scrollTop;
    //   var elemento = document.getElementsByClassName('no-background');
   
   
    //    var elemento3=elemento[0];
    //   if (scrollOffset > 80) {
    //  //   this.scrolled.emit(true);
    
    //    elemento3.classList.add("set-bg");
    //   } else {
    //   //   this.scrolled.emit(false);
    //    elemento3.classList.remove("set-bg");
    //   }
    }
}
