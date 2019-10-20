import { Component, OnInit, Input } from '@angular/core';

// Declaramos las variables para jQuery
declare var jQuery:any;
declare var $:any;
@Component({
  selector: 'app-quickmenu',
  templateUrl: './quickmenu.component.html',
  styleUrls: ['./quickmenu.component.scss'],
})
export class QuickmenuComponent implements OnInit {
  @Input() title: string;
  constructor() { }

  ngOnInit() {}

  onClk(event){
    $('.navi-menu-button').addClass('focused');

    $('div.nav-menu').fadeIn(50,function(e){
      $('nav.menu').addClass('opened');
    });
  }
}
