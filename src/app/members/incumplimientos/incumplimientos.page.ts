import { AuthenticationService } from './../../services/authentication.service';
import { UtilitiesService } from './../../services/utilities.service';
import { Storage } from '@ionic/storage';
import { Component, OnInit,ElementRef } from '@angular/core';

import { CanActivate, ActivatedRoute,Router } from '@angular/router';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { first } from 'rxjs/operators';
import 'datatables.net';
import 'datatables.net-dt';
declare var jQuery:any;
declare var $:any;
class Incumplimientos {
  id: number;
  incumple: string;
  asunto: string;
  accion: number;
}

class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
  abiertos:number;
  cerrados:number;
}

@Component({
  selector: 'app-incumplimientos',
  templateUrl: './incumplimientos.page.html',
  styleUrls: ['./incumplimientos.page.scss'],
})
export class IncumplimientosPage implements OnInit {
  folio:string;
  polId:string;
  dt;
  dtOptions: DataTables.Settings = {};
  incumplimientos: Incumplimientos[];
  propmorInfo:any;
  place:string='incumplimientos';
  abiertos:number;
  cerrados:number;
  constructor(private storage: Storage,private authService: AuthenticationService,
              private utilities: UtilitiesService,
              private http: HttpClient,
              private elRef:ElementRef,
              private router: Router, private rutaActiva: ActivatedRoute) { }
 
  ngOnInit() {
    this.polId=this.rutaActiva.snapshot.params.pol;
   
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
        dataTablesParameters.tipo='incumplimientos';
   
        dataTablesParameters.polId=this.polId; 
        that.http
          .post<DataTablesResponse>(
            `${this.utilities.baseApiUrl}api/polizas/getDatatableCrmIncumplimientosPoliza/`, //https://angular-datatables-demo-server.herokuapp.com/
            dataTablesParameters, this.utilities.httpOptions
          ).subscribe(resp => {
            that.incumplimientos = resp.data;
            that.abiertos=resp.abiertos;
            that.cerrados=resp.cerrados;
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
        { data: 'incumple' }, 
        { data: 'asunto' },
        { data: 'accion' }, 
      ],
       // Use this attribute to enable the responsive extension
       columnDefs: [
        { "orderable": false, "targets": [0,1,2,3] }
      ],
      responsive: true,
      language:{
        "decimal":        "",
        "emptyTable":     "No hay incumplimientos para mostrar",
        "info":           "Mostrando _START_ a _END_ de _TOTAL_",
        "infoEmpty":      "",
        "infoFiltered":   "(filtrados de _MAX_ pólizas)",
        "infoPostFix":    "",
        "thousands":      ",",
        "lengthMenu":     "Mostrando _MENU_ incumplimientos",
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
    
    this.utilities.presentAlert('success','Generar Alerta',false,0); 
 
  
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
      this.utilities.peticionHttp('get',`${this.utilities.baseApiUrl}api/polizas/getIncumplimientoDetailsById/${id}`).pipe(first())
      .subscribe(
          data => {
           console.log(data);
           $(`#${tr}`).after(this.format(data)); //si no existe lo creo
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
  format (datos) {
    // `d` is the original data object for the row <a style="float:right" data-folio="${datos.folio}" data-id="${datos.id}" class="nuevo-inc" href="Javascript:void(0)" >+ Nuevo</a>
    
    return `<tr id="child_${datos.id}" style="display:none">
              <td colspan="6" >
                <div class="row">

                  <div class="col-12 text-left borde-bajo-punteado">
                      <b>Estado:</b> ${datos.abierto} 
                  </div>
                   <div class="col-12 text-left borde-bajo-punteado">
                      <b>Parte que Incumple:</b> ${datos.incumple} 
                  </div>
                   <div class="col-12 text-left borde-bajo-punteado">
                      <b>Fecha:</b> ${datos.fecha} 
                  </div>
                  <div class="col-12 text-left borde-bajo-punteado">
                      <b>Nombre:</b> ${datos.nombre} 
                  </div>
                   <div class="col-12 text-left borde-bajo-punteado">
                      <b>Teléfono:</b> ${datos.telefono} 
                  </div>
                   <div class="col-12 text-left borde-bajo-punteado">
                      <b>Email:</b> ${datos.email} 
                  </div>
                  <div class="col-12 text-left borde-bajo-punteado">
                      <b>Asunto:</b> ${datos.asunto} 
                  </div>
                 
                  <div class="col-12 text-left borde-bajo-punteado" >
                      <b>Observaciones:</b> ${datos.observaciones}
                  </div>
                </div>
              
              <!--
                <div class="row">
                  <div class="col-12 text-left">
                    <div class="col-8 ">
                      <a style="text-align: center" href="Javascript:void(0);" class="button circle inline red">Boton</a> 
                    </div>
                  </div>
                </div>
                <div class="form-divider"></div>
              -->
               
              </td>
            
              
            </tr>`;
}
  doSomethingOnScroll($event:Event  ){

    this.utilities.doSomethingOnScroll($event);
  
  }

}
