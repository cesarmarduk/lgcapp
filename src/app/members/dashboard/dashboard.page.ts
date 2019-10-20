import { AuthenticationService } from './../../services/authentication.service';
import { UtilitiesService } from './../../services/utilities.service';
import { Component, OnInit } from '@angular/core';
declare var jQuery:any;
declare var $:any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
 
  constructor(private authService: AuthenticationService,private utilities: UtilitiesService) { }
 
  ngOnInit() {
    console.log('inicio');
    this.authService.checkToken();
  }
 
  logout() {
    this.authService.logout();
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