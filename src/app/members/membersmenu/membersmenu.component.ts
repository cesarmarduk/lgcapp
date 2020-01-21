import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../../services/authentication.service';
import { UtilitiesService } from './../../services/utilities.service';
@Component({
  selector: 'app-membersmenu',
  templateUrl: './membersmenu.component.html',
  styleUrls: ['./membersmenu.component.scss'],
})

export class MembersmenuComponent implements OnInit {
  perfilAsesor:boolean = false;
  perfilInmo:boolean = false;
  perfilPropFis:boolean = false;
  perfilPropMor:boolean = false;
  perfilInqFis:boolean = false;
  perfilInqMor:boolean = false;
  perfilAgente:boolean = false;
  constructor(private authService: AuthenticationService) { }

  ngOnInit() {

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
  logout() {
    this.authService.logout();
  }
  onClose(event){
    this.authService.cerrarMenu();
  
  }
}
