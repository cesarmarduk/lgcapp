import { Component, OnInit } from '@angular/core';
import { UtilitiesService } from './../services/utilities.service';
import { first } from 'rxjs/operators';
class Noticias {
  id: number;
  titulo: string;
  url: string;
  etiqueta: string;
  autor: string;
  fecha: string;
  image: string;
}
class NoticiasResponse {
  datos: any[];
 
}
@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.scss'],
})
export class NoticiasComponent implements OnInit {
  noticias: Noticias[];
  mostrar:boolean=false;
  constructor( private utilities: UtilitiesService) { }

  ngOnInit() {
    const that = this;
    this.utilities.peticionHttp<NoticiasResponse>('get',`${this.utilities.baseApiUrl}api/noticias/getAll`).pipe(first())
    .subscribe(
      resp => {
      //   console.log(data);
          that.noticias = resp.datos;
          console.log(that.noticias)
          if(Object.keys(that.noticias).length > 0 ){
            this.mostrar=true;
          }
        },
        error => {
            this.utilities.presentAlert('info','No se encontraron noticias, Comprueba tu conexión a internet :(',false,0);  
        });;

  }

}
