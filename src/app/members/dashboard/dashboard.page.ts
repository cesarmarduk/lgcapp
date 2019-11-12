import { AuthenticationService } from './../../services/authentication.service';
import { UtilitiesService } from './../../services/utilities.service';

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
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.css'],
})
export class DashboardPage implements OnInit {
  dt;
  dtOptions: DataTables.Settings = {};
  polizas: Polizas[];
  
  constructor(private authService: AuthenticationService,
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
          data:0,
          className: 'details-control',
          orderable:false,
          defaultContent: ''
        }, 
        { data: 'folio' }, 
        { data: 'costo' },
        { data: 'pago' }, 
        { data: 'admin_pago' }, 
        { data: 'estado_pago'}, ],
       // Use this attribute to enable the responsive extension
      responsive: true,
      language:{
        "decimal":        "",
        "emptyTable":     "No hay pólizas para mostrar",
        "info":           "Mostrando _START_ a _END_ de _TOTAL_",
        "infoEmpty":      "Sin datos para mostrar",
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
  format (datos) {
    // `d` is the original data object for the row
   console.log(datos.garantes.length);
    var propietarios=`Sin Informacion`;
        if(datos.propietarios){
          propietarios='';
          $.each(datos.propietarios,function(i, val){
            propietarios+=val;
          });
        }
    var inquilinos=`Sin Informacion`;
        if(datos.inquilinos){
          inquilinos='';
          $.each(datos.inquilinos,function(i, val){
            inquilinos+=val;
          });
        }
    var garantes=`Sin Informacion`;
        if(datos.garantes){
          garantes='';
          $.each(datos.garantes,function(i, val){
            garantes+=val;
          });
        }
    return `<tr id="child_${datos.id}" style="display:none">
              <td colspan="6" >
                <div class="row">
                  <div class="col-7 text-left borde-bajo-punteado">
                      <b>Incumplimientos:</b> ${datos.incumplimientos} <a style="float:right" data-folio="${datos.folio}" data-id="${datos.id}" class="nuevo-inc" href="Javascript:void(0)" >+ Nuevo</a>
                  </div>
                  <div class="col-5 text-letf"></div>
                  <div class="col-6 text-left borde-bajo-punteado" >
                      <b>Inicio:</b> ${datos.fecha_inicio}
                  </div>
                  <div class="col-6 text-left borde-bajo-punteado">
                      <b>Vencimiento:</b> ${datos.fecha_termino}
                  </div>
                 
                  <div class="col-6 text-left borde-bajo-punteado">
                      <b>Ejecutivo:</b> ${datos.ejecutivo} 
                  </div>
                  <div class="col-6 text-left borde-bajo-punteado">
                      <b>Asesor:</b>  ${datos.asesor}
                  </div>
                  <div class="col-12 text-left borde-bajo-punteado">
                  <b>Dirección:</b>
                      <div class="col-12 ">
                        ${datos.direccion}
                      </div>
                  </div>
                  <div class="col-12 text-left borde-bajo-punteado">
                  <b>Propietarios:</b>
                      <div class="col-12 ">
                        ${propietarios}
                      </div>
                  </div>
                  <div class="col-12 text-left borde-bajo-punteado">
                  <b>Inquilinos:</b>
                      <div class="col-12 ">
                        ${inquilinos}
                      </div>
                  </div>
                  <div class="col-12 text-left borde-bajo-punteado">
                  <b>Garantes:</b>
                      <div class="col-12 ">
                        ${garantes}
                       
                      </div>
                  </div>
                </div>
                <div class="form-divider"></div>
                <div class="row">
                  <div class="col-12 text-left">
                    <div class="col-8 ">
                      <a style="text-align: center" href="Javascript:void(0);" class="button circle inline red">Boton</a> 
                    </div>
                  </div>
                </div>
                <div class="form-divider"></div>
              </td>
            
              
            </tr>`;
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
           $(`#${tr}`).after(this.format(data)); //si no existe lo creo
           $(td).html('&CircleMinus;');
           $(`.td_${id}`).css("font-weight","bold")
           $(`#child_${id}`).show('slow');
           $( `.nuevo-inc`).bind( "click", function(e) {
            that.nuevoIncumplimiento(e);
          });
        
          },
          error => {
              this.utilities.presentAlert('','Ha ocurrido un error al Autenticar',error['error'],['OK'])
          });;

          
   /*   this.http
        .get<any>('https://angular-datatables-demo-server.herokuapp.com/')
        .subscribe((response) => {
          console.log(response);
         
          
        }, (error) => {
          alert('Error Found!');
        });*/
      
    }
  
  }
  logout() {
    this.authService.logout();
  }
 
  doSomethingOnScroll($event:Event  ){

    this.utilities.doSomethingOnScroll($event);
  
  }
}