import { AuthenticationService } from './../../services/authentication.service';
import { UtilitiesService } from './../../services/utilities.service';

import { Component, OnInit } from '@angular/core';

import { HttpClient, HttpResponse } from '@angular/common/http';

import 'datatables.net';
import 'datatables.net-dt';
declare var jQuery:any;
declare var $:any;
class Person {
  id: number;
  firstName: string;
  lastName: string;
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
  persons: Person[];
  constructor(private authService: AuthenticationService,private utilities: UtilitiesService,private http: HttpClient) { }
 
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
      ajax: (dataTablesParameters: any, callback) => {
        that.http
          .post<DataTablesResponse>(
            'https://angular-datatables-demo-server.herokuapp.com/',
            dataTablesParameters, {}
          ).subscribe(resp => {
            that.persons = resp.data;

            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: []
            });
          });
      },
      columns: [{ 
         
          className: 'details-control',
          
          defaultContent: ''
        }, 
        { data: 'firstName' }, 
        { data: 'lastName' }],
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
  format (id) {
    // `d` is the original data object for the row
    return `<tr id="child_${id}"><td colspan="4" ><table cellpadding="4" cellspacing="0" border="0" >
        <tr>
            <td>Full name:</td>
            <td></td>
        </tr>
        <tr>
            <td>Extension number:</td>
            <td></td>
        </tr>
        <tr>
            <td>Extra info:</td>
            <td>And any further details here (images etc)...</td>
        </tr>
    </table></td></tr>`;
}
  seeDetails($event){
   
    var tr = $($event.currentTarget).parents('tr').attr('id');
    var id=tr.split('_')[1];
    if($(`#child_${id}`).length!=0){ //Si ya existe
      if($(`#child_${id}`).is(':visible')){ //checkeo si es visible
        $($event.currentTarget).html('&oplus;');
        $(`#child_${id}`).hide(); // si es visible, lo escono
      }else{ 
        $($event.currentTarget).html('&CircleMinus;');
        $(`#child_${id}`).show();   //si no es visible, lo muestro
      }    
    }else{
      $(`#${tr}`).after(this.format(id)); //si no existe lo creo
      $($event.currentTarget).html('&CircleMinus;');
    }
  
  }
  logout() {
    this.authService.logout();
  }
 
  doSomethingOnScroll($event:Event  ){

    this.utilities.doSomethingOnScroll($event);
  
  }
}