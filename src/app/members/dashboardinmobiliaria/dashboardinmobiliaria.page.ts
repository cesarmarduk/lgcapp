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
  selector: 'app-dashboardinmobiliaria',
  templateUrl: './dashboardinmobiliaria.page.html',
  styleUrls: ['./dashboardinmobiliaria.page.scss'],
})
export class DashboardinmobiliariaPage implements OnInit {
  dt;
  dtOptions: DataTables.Settings = {};
  firmadas: Proteccion[];
  proceso: Proteccion[];
  rechazadas: Proteccion[];
  xfirmar: Proteccion[];
  renovar: Proteccion[];
  reclamo: Proteccion[];
  inmoInfo:any;
  inmobiliaria:any;
  tipo:any;
  data:any;
  perfil:string='inmobiliaria';
  constructor(private storage: Storage,private authService: AuthenticationService,
              private utilities: UtilitiesService,
              private http: HttpClient,
              private elRef:ElementRef,
              private router: Router) { }
 
  ngOnInit() {
    const that = this;
    that.authService.checkToken();
    that.inmoInfo=JSON.parse(localStorage.getItem("INFOINMOBILIARIA"));
    that.inmobiliaria=this.inmoInfo.id; 
    that.tipo='crm_poliza';
    that.data={
      tipo:that.tipo,
      inmobiliaria:that.inmobiliaria

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
          console.log(that.proceso.length);
          if(that.firmadas.length>0){
            $('#tabFirmadasInmo').addClass('active');
            $('#contentFirmadasInmo').addClass('active');
          }else if(that.proceso.length>0){
            $('#tabProcesoInmo').addClass('active');
            $('#contentProcesoInmo').addClass('active');
          }else if(that.rechazadas.length>0){
            $('#tabRechazadasInmo').addClass('active');
            $('#contentRechazadasInmo').addClass('active');
          }else if(that.xfirmar.length>0){
            $('#tabFirmarInmo').addClass('active');
            $('#contentFirmarsInmo').addClass('active');
          }else if(that.renovar.length>0){
            $('#tabRenovarInmo').addClass('active');
            $('#contentRenovarInmo').addClass('active');
          }else if(that.reclamo.length>0){
            $('#tabReclamosInmo').addClass('active');
            $('#contentReclamosInmo').addClass('active');
          }else{
            $('#tabFirmadasInmo').addClass('active');
            $('#contentFirmadasInmo').addClass('active');
          }
          $('.countRenovacionesInmo').html(that.renovar.length);
          $('.countActivasInmo').html(that.proceso.length+that.firmadas.length);
          $('.countFirmasInmo').html(that.xfirmar.length);
          $('.countReclamosInmo').html(that.reclamo.length);
      
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