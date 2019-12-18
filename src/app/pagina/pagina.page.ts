import { Component, OnInit } from '@angular/core';
import { UtilitiesService } from '../services/utilities.service';
import { ActivatedRoute, Params } from '@angular/router';
import { first } from 'rxjs/operators';
declare var jQuery:any;
declare var $:any;

class PaginaResponse {
  datos: any;
}
@Component({
  selector: 'app-pagina',
  templateUrl: './pagina.page.html',
  styleUrls: ['./pagina.page.scss'],
})
export class PaginaPage implements OnInit {
  id:number;
  title: string;
 
  mostrar:boolean=false;
  titulo: string;
  etiqueta: string;
  autor: string;
  fecha: string;
  image: string;
  contenido:string;
  
  constructor(private utilities: UtilitiesService,private rutaActiva: ActivatedRoute) { }

  ngOnInit() {
    const that = this;
    that.id=that.rutaActiva.snapshot.params.id;
  
    this.utilities.peticionHttp<PaginaResponse>('get',`${this.utilities.baseApiUrl}api/paginas/getId/${this.id}`).pipe(first())
    .subscribe(
      resp => {
        that.titulo = resp.datos.titulo;
        that.etiqueta = resp.datos.etiqueta;
        that.autor = resp.datos.autor;
        that.fecha = resp.datos.fecha;
        that.image = resp.datos.image;
        that.contenido = resp.datos.contenido;
      },
      error => {
            this.utilities.presentAlert('info','Error al Obtener Datos, Comprueba tu conexión a internet :(',false,0);  
      }
    );
  }
  doSomethingOnScroll($event:Event  ){
    this.utilities.doSomethingOnScroll($event);
  }

}
