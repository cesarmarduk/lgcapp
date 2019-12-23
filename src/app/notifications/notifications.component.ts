import { Component, OnInit, Input } from '@angular/core';

// Declaramos las variables para jQuery
declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {
  @Input() valor: number;
  @Input() lugar: string;
  @Input() bell: boolean;
  @Input() place: boolean;
  constructor() { }

  ngOnInit() {}

  fadeIn(el){
    el.classList.add('opened');
    console.log('open');
  }
  
 

  onClk(event){
    $('.navi-menu-button').addClass('focused');

    $('div.nav-menu').fadeIn(50,function(e){
      $('nav.menu').addClass('opened');
    });
  }

 

}
