import { Component, OnInit } from '@angular/core';
import { UtilitiesService } from '../services/utilities.service';
import { ActivatedRoute, Params } from '@angular/router';
import { first } from 'rxjs/operators';
import { HtmlParser } from '@angular/compiler';
declare var jQuery:any;
declare var $:any;
class Noticia {
  id: number;
  titulo: string;
  etiqueta: string;
  autor: string;
  fecha: string;
  image: string;
  contenido:string;
}
class NoticiaResponse {
  datos: any;
}
@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.page.html',
  styleUrls: ['./noticia.page.scss'],
})
export class NoticiaPage implements OnInit {
  id:number;
  title: string;
  noticia: Noticia;
  mostrar:boolean=false;
  titulo: string;
  etiqueta: string;
  autor: string;
  fecha: string;
  image: string;
  contenido:string;
  constructor(private utilities: UtilitiesService,private rutaActiva: ActivatedRoute) { 

    this.title = 'NOTICIA';
  }
  ngOnInit() {
    this.id=this.rutaActiva.snapshot.params.id;
    const that = this;
    this.utilities.peticionHttp<NoticiaResponse>('get',`${this.utilities.baseApiUrl}api/noticias/getId/${this.id}`).pipe(first())
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
