import { Component, OnInit } from '@angular/core';
import { UtilitiesService } from '../../services/utilities.service';
import { ActivatedRoute, Router } from '@angular/router';

import { HttpClient, HttpResponse } from '@angular/common/http';
import { first } from 'rxjs/operators';
import 'datatables.net';
import 'datatables.net-dt';
declare var jQuery:any;
declare var $:any;
class Alertas {
  id: number;
  titulo: string;
  descripcion: string;
  fecha: string;
  hora: string;
  
}
class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}
@Component({
  selector: 'app-alertas',
  templateUrl: './alertas.page.html',
  styleUrls: ['./alertas.page.scss'],
})

export class AlertasPage implements OnInit {
  title: string;
  dt;
  dtOptionss: DataTables.Settings = {};
  alertas: Alertas[];
  constructor(
    private utilities: UtilitiesService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,) { 

    this.title = 'Alertas';

  }
  ngOnInit() {

    const that = this;
    	
    $.fn.DataTable.ext.pager.numbers_length = 7;
   
    
    this.dtOptionss = {
      pagingType: 'numbers',
      pageLength: 10,
      lengthChange:false,
      serverSide: true,
      processing: true,
      autoWidth: false,
     
      ajax: (dataTablesParameters: any, callback) => {
        dataTablesParameters.tipo='alertas';
        that.http
          .post<DataTablesResponse>(
            `${this.utilities.baseApiUrl}api/alertas/getDatatableAlertas/`, //https://angular-datatables-demo-server.herokuapp.com/
            dataTablesParameters, this.utilities.httpOptions
          ).subscribe(resp => {
            that.alertas = resp.data;

            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: []
            });
           
          });
      },
    
       // Use this attribute to enable the responsive extension
       columnDefs: [
        { "orderable": false, "targets": [0,1,2,3] }
      ],
      responsive: true,
      language:{
        "decimal":        "",
        "emptyTable":     "No hay Alertas para mostrar",
        "info":           "Mostrando _START_ a _END_ de _TOTAL_",
        "infoEmpty":      "Sin datos para mostrar",
        "infoFiltered":   "(filtrados de _MAX_ pólizas)",
        "infoPostFix":    "",
        "thousands":      ",",
        "lengthMenu":     "Mostrando _MENU_ alertas",
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

}
