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
class Polizas {
  id: number;
  folio: string;
  costo: string;
  pago: number;
  admin_pago: number;
  estado_pago: number;
}

class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}

const ASESOR = 'asesorLog';
const INMOBILIARIA = 'inmobiliariaLog';
const PROPFIS = 'propfisLog';
const PROPMOR = 'propmorLog';
const INQFIS = 'inqfisLog';
const INQMOR = 'inqmorLog';

@Component({
  selector: 'app-dashboardinqfis',
  templateUrl: './dashboardinqfis.page.html',
  styleUrls: ['./dashboardinqfis.page.scss'],
})
export class DashboardinqfisPage implements OnInit {
  dt;
  dtOptions: DataTables.Settings = {};
  polizas: Polizas[];
  inqfisInfo:any;
  constructor(private storage: Storage,private authService: AuthenticationService,
              private utilities: UtilitiesService,
              private http: HttpClient,
              private elRef:ElementRef,
              private router: Router) { }
 
  ngOnInit() {
    this.authService.checkToken();
    const that = this;
   
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
        this.inqfisInfo=JSON.parse(localStorage.getItem("INFOINQFIS"));
        dataTablesParameters.inqfis=this.inqfisInfo.idextra; 
        that.http
          .post<DataTablesResponse>(
            `${this.utilities.baseApiUrl}api/polizas/getDatatableCrmPolizas/`, //https://angular-datatables-demo-server.herokuapp.com/
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
   
  }
  nuevaAlerta($event){
    
    this.utilities.presentAlert('','Generar Alerta','Alerta',['OK']);
  
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
              this.utilities.presentAlert('','Ha ocurrido un error al Autenticar',error['error'],['OK'])
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