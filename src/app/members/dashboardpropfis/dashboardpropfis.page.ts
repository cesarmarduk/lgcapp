import { AuthenticationService } from './../../services/authentication.service';
import { UtilitiesService } from './../../services/utilities.service';
import { Storage } from '@ionic/storage';
import { Component, OnInit,ElementRef } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { first } from 'rxjs/operators';
import 'datatables.net';
import 'datatables.net-dt';
declare var jQuery:any;
declare var $:any;
class Proteccion {
  id: number;
  folio: string;
  costo: string;
  monto_renta: string;
  pago: number;
  admin_pago: number;
  estado_pago: number;
  fecha_termino:any;
  fecha_firma:any;
  fecha_creada:any;
  fecha_incumplimiento:any;
}
class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}
class polizasResponse {
  polizasFirmadas: any[];
  polizasProceso: any[];
  polizasRechazadas: any[];
  polizasXFirmar: any[];
  polizasRenovar: any[];
  polizasReclamo: any[];

}

const ASESOR = 'asesorLog';
const INMOBILIARIA = 'inmobiliariaLog';
const PROPFIS = 'propfisLog';
const PROPMOR = 'propmorLog';
const INQFIS = 'inqfisLog';
const INQMOR = 'inqmorLog';
@Component({
  selector: 'app-dashboardpropfis',
  templateUrl: './dashboardpropfis.page.html',
  styleUrls: ['./dashboardpropfis.page.scss'],
})
export class DashboardpropfisPage implements OnInit {
  dt;
  dtOptions: DataTables.Settings = {};
  firmadas: Proteccion[];
  proceso: Proteccion[];
  rechazadas: Proteccion[];
  xfirmar: Proteccion[];
  renovar: Proteccion[];
  reclamo: Proteccion[];
  propfisInfo:any;
  propfis:any;
  tipo:any;
  data:any;
  constructor(private storage: Storage,private authService: AuthenticationService,
              private utilities: UtilitiesService,
              private http: HttpClient,
              private elRef:ElementRef,
              private router: Router) { }
 
  ngOnInit() {
    const that = this;
    that.authService.checkToken();
 
    
 
    that.propfisInfo=JSON.parse(localStorage.getItem("INFOPROPFIS"));
    that.propfis=this.propfisInfo.idextra; 
   
    that.tipo='crm_poliza';
    that.data={
      tipo:that.tipo,
      propfis:that.propfis

    }
    that.utilities.peticionHttp<polizasResponse>('post',`${this.utilities.baseApiUrl}api/polizas/getCrmPolizas/`,that.data).pipe()
    .subscribe(
        data => {
        //  this.utilities.presentAlert('info','Se ha enviado la informacion',false,4000); 
          that.firmadas=data.polizasFirmadas;
          that.proceso=data.polizasProceso;
          that.rechazadas=data.polizasRechazadas;
          that.xfirmar=data.polizasXFirmar;
          that.renovar=data.polizasRenovar;
          that.reclamo=data.polizasReclamo;

          $('.countRenovacionesPropfis').html(that.renovar.length);
          $('.countActivasPropfis').html(that.proceso.length+that.firmadas.length);
          $('.countFirmasPropfis').html(that.xfirmar.length);
          $('.countReclamosPropfis').html(that.reclamo.length);
      
        },
        error => {
          this.utilities.presentAlert('error','Ha ocurrido un error al enviar peticion',false,0); 
      
    });
  }
  nuevoIncumplimiento($event){
    var polId=$($event.currentTarget).data('id');
    var folio=$($event.currentTarget).data('folio');
    var datos = { 
          queryParams: 
          { 
            polId: polId,
            folio:folio 
          } 
        }
    this.router.navigate(['/members/crear-incumplimiento'],datos);
   // this.utilities.presentAlert('','Se va a crear incumplimiento','Crear',['OK']);
  }
 
  logout() {
    this.authService.logout();
  }
 
  doSomethingOnScroll($event:Event  ){
    this.utilities.doSomethingOnScroll($event);
  }
}


