import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../../services/authentication.service';
import { UtilitiesService } from './../../services/utilities.service';
@Component({
  selector: 'app-membersmenu',
  templateUrl: './membersmenu.component.html',
  styleUrls: ['./membersmenu.component.scss'],
})
export class MembersmenuComponent implements OnInit {

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {}
  logout() {
    this.authService.logout();
  }
  onClose(event){
    if ($(event.target).hasClass('nav-menu')){
			$('.navi-menu-button').removeClass('focused');
      $('nav.menu').removeClass('opened');
      $('div.nav-menu').fadeOut(200);
		}
  
  }
}
