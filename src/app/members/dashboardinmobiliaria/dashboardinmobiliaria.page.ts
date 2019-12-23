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
          this.utilities.presentAlert('info','Se ha enviado la informacion',false,4000); 
          that.firmadas=data.polizasFirmadas;
          that.proceso=data.polizasProceso;
          that.rechazadas=data.polizasRechazadas;
          that.xfirmar=data.polizasXFirmar;
          that.renovar=data.polizasRenovar;
          that.reclamo=data.polizasReclamo;

          $('.countRenovaciones').html(that.renovar.length);
          $('.countActivas').html(that.proceso.length+that.firmadas.length);
          $('.countFirmas').html(that.xfirmar.length);
          $('.countReclamos').html(that.reclamo.length);
          console.log(data);
         
        },
        error => {
          this.utilities.presentAlert('error','Ha ocurrido un error al enviar peticion',false,0); 
      
    });
/*
    $.fn.DataTable.ext.pager.numbers_length = 7;
    this.dtOptions = {
      pagingType: 'numbers',
      pageLength: 10,
      lengthChange:false,
      serverSide: true,
      processing: true,
      autoWidth: false,
      ajax: (dataTablesParameters: any, callback) => {
        dataTablesParameters.tipo='crm_poliza';
        this.inmoInfo=JSON.parse(localStorage.getItem("INFOINMOBILIARIA"));
        dataTablesParameters.inmobiliaria=this.inmoInfo.id; 
        that.http
          .post<DataTablesResponse>(
            `${, //https://angular-datatables-demo-server.herokuapp.com/
            dataTablesParameters, this.utilities.httpOptions
          ).subscribe(resp => {
            that.polizas = resp.data;
            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: []
            });
          });
      },
      columns: [{ 
          data:'id',
        }, 
        { data: 'folio' }, 
        { data: 'costo' },
        { data: 'pago' }, 
        { data: 'admin_pago' }, 
        { data: 'estado_pago'}, ],
       // Use this attribute to enable the responsive extension
       columnDefs: [
        { "orderable": false, "targets": [0,1,2,3,4,5] }
      ],
      responsive: true,
      language:{
        "decimal":        "",
        "emptyTable":     "No hay pólizas para mostrar",
        "info":           "Mostrando _START_ a _END_ de _TOTAL_",
        "infoEmpty":      "",
        "infoFiltered":   "(filtrados de _MAX_ pólizas)",
        "infoPostFix":    "",
        "thousands":      ",",
        "lengthMenu":     "Mostrando _MENU_ pólizas",
        "loadingRecords": "Cargando...",
        "processing":     "Procesando...",
        "search":         "",
        "zeroRecords":    "No se encontraron coincidencias",
        "paginate": {
            "first":      "Primera",
            "last":       "Ultima",
            "next":       "Siguiente",
            "previous":   "Anterior"
        },
        "aria": {
            "sortAscending":  ": Activa para ordenar de forma Ascendente",
            "sortDescending": ": Activa para ordenar de forma Descendienci"
        }
      }
    };
*/
   
  }
  nuevaAlerta($event){
    this.utilities.presentAlert('info','Generar Alerta',false,0); 
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
 
  seeDetails($event){
    var that=this;
    var td=$event.currentTarget;
    var tr = $(td).parents('tr').attr('id');
    var id=tr.split('_')[1];
    if($(`#child_${id}`).length!=0){ //Si ya existe
      if($(`#child_${id}`).is(':visible')){ //checkeo si es visible
        $(td).html('&oplus;');
        $(`#child_${id}`).hide('slow'); // si es visible, lo escono
        $(`.td_${id}`).css("font-weight","normal")
      }else{ 
        $(td).html('&CircleMinus;');
        $(`#child_${id}`).show('slow');   //si no es visible, lo muestro
        $(`.td_${id}`).css("font-weight","bold")
      }    
    }else{
      this.utilities.peticionHttp('get',`${this.utilities.baseApiUrl}api/polizas/getPolizaDetailsById/${id}`).pipe(first())
      .subscribe(
          data => {
        //   console.log(data);
           $(`#${tr}`).after(this.utilities.format(data)); //si no existe lo creo
           $(td).html('&CircleMinus;');
           $(`.td_${id}`).css("font-weight","bold")
           $(`#child_${id}`).show('slow');
           $( `.nuevo-inc`).bind( "click", function(e) {
              that.nuevoIncumplimiento(e);
           });
           $( `.nueva-alerta`).bind( "click", function(e) {
              that.nuevaAlerta(e);
           });
          },
          error => {
            this.utilities.presentAlert('info','Ha ocurrido un error al Obtener Datos',false,0); 
          });;
    }
  
  }
  logout() {
    this.authService.logout();
  }
 
  doSomethingOnScroll($event:Event  ){
    this.utilities.doSomethingOnScroll($event);
  }
}