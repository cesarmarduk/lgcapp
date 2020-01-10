import { AuthenticationService } from './../../../services/authentication.service';
import { Component, OnInit, ɵSWITCH_RENDERER2_FACTORY__POST_R3__ } from '@angular/core';
import { UtilitiesService } from '../../../services/utilities.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Device } from '@ionic-native/device/ngx';
import { first } from 'rxjs/operators';
class response {
  data:any;
  fecha:any;
  hora:any;
  titulo:any;
  descripcion:any;
  status:any;
  message:any;
}
@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
})
export class EditarPage implements OnInit {
  title: string;
  id:string='';
  fecha_firma:any='';
  titleAlert:string='';
  contentAlert:string='';
  fechaAlert:string='';
  horaAlert:string='';
  constructor(
    private utilities: UtilitiesService,
    private rutaActiva: ActivatedRoute,
    private device: Device,
    private authService: AuthenticationService,private router: Router) { 
   
    this.title = 'EDITAR ALERTA';
    
  }

  ngOnInit() {
    var that = this;
    this.id=this.rutaActiva.snapshot.params.id;
    that.utilities.peticionHttp<response>('get',`${that.utilities.baseApiUrl}api/Alertas/getDataAlerta/${that.id}`).pipe(first())
    .subscribe(
      resp => {
        that.fechaAlert = resp.fecha;
        that.horaAlert = resp.hora;
        that.titleAlert = resp.titulo;
        that.contentAlert = resp.descripcion;
       
      },
      error => {
        that.utilities.presentAlert('info','Error al Obtener Datos, Comprueba tu conexión a internet :(',false,0);  
      }
    );
  }
  editarAlerta($event:Event  ){
    var fecha:any= $('#fecha_alert_edit').val();
    var hora:any = $('#hora_alert_edit').val();
    var titulo:any = $('#titulo_alert_edit').val();
    var descripcion:any = $('#descripcion_alert_edit').val();
    var uuid=this.device.uuid;
    var arrayfecha= fecha.split('-');
    var arrayHora= hora.split(':');
    if(fecha.trim().length==0){
      this.utilities.presentAlert('info','No puede dejar la fecha vacia',false,0); 
      return false;
    }
    if(hora.trim().length==0){
      this.utilities.presentAlert('info','Debe Asignar una hora',false,0);
      return false;
    }
    if(titulo.trim().length==0){
      this.utilities.presentAlert('info','Agregue un titulo para la alerta',false,0);
      return false;
    }
    if(descripcion.trim().length==0){
      this.utilities.presentAlert('info','No olvide una descripcion corta',false,0);
      return false;
    }
    var time=new Date(arrayfecha[0],arrayfecha[1]-1,arrayfecha[2],arrayHora[0],arrayHora[1]).getTime();
    this.utilities.peticionHttp<response>(
                  'post',
                  `${this.utilities.baseApiUrl}api/Alertas/editarAlerta`,
                  {   
                      'fecha':fecha, 
                      'hora':hora,
                      'titulo':titulo,
                      'descripcion':descripcion,
                      'uuid':uuid,
                      'time':time,
                      'id':this.id
                      
                  }).pipe()
        .subscribe(
          data => {
            if(data.data){
              this.utilities.deleteNotification(
                this.id
              );
              this.utilities.openNotification(
                this.id,
                titulo,
                descripcion,
                'alarm_icon',
                time
              );
              this.utilities.presentAlert('success','Se ha editado la informacion',false,0);
              this.router.navigate(['home']);
            }else{
              this.utilities.presentAlert('warning','No se pudo editar',false,0);
            }
           
           
           
          },
          error => {
            this.utilities.presentAlert('error','Ha ocurrido un error al enviar peticion',false,0); 

        });
    
  }

  eliminarAlerta($event:Event ){
    this.utilities.peticionHttp<response>(
      'post',
      `${this.utilities.baseApiUrl}api/Alertas/eliminarAlerta`,
      {   
         
          'id':this.id
          
      }).pipe()
    .subscribe(
    data => {
        if(data.data){
          this.utilities.deleteNotification(
            this.id
          );
          this.utilities.presentAlert('success','Se ha Eliminado la Alerta',false,0);
          $(`#dttr_${this.id}`).remove();
          this.router.navigate(['/members/alertas']);
        }else{
          this.utilities.presentAlert('warning','No se pudo editar',false,0);
        }
    },
    error => {
    this.utilities.presentAlert('error','Ha ocurrido un error al enviar peticion',false,0); 

    });
  }
}
