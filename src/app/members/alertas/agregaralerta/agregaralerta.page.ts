import { AuthenticationService } from './../../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { UtilitiesService } from '../../../services/utilities.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Device } from '@ionic-native/device/ngx';
interface response {
  data:any;
  status:any;
  message:any;
}
@Component({
  selector: 'app-agregaralerta',
  templateUrl: './agregaralerta.page.html',
  styleUrls: ['./agregaralerta.page.scss'],
})
export class AgregaralertaPage implements OnInit {
  title: string;
  folio:string='';
  fecha_firma:any='';
  titleAlert:string='';
  contentAlert:string='';
  fecha:any;
  constructor(
    private utilities: UtilitiesService,
    private rutaActiva: ActivatedRoute,
    private device: Device,
    private authService: AuthenticationService,private router: Router) { 
   
    this.title = 'AGREGAR ALERTA';
    
  }

  ngOnInit() {
    this.folio=this.rutaActiva.snapshot.params.folio;
   
    this.fecha_firma=this.rutaActiva.snapshot.params.fecha;
  
    if(this.folio){
      this.titleAlert=`Firma de Protección ${this.folio}`;
      this.contentAlert=`Preparate para la firma de la Protección con Folio: ${this.folio}`;
    }
  }
  validarFormatoFecha(campo) {
    var RegExPattern = /^\d{1,2}\/\d{1,2}\/\d{2,4}$/;
    if ((campo.match(RegExPattern)) && (campo!='')) {
          return true;
    } else {
          return false;
    }
  }
  generarAlerta($event:Event  ){
    var fecha:any= $('#fecha_alert').val();
    var hora:any = $('#hora_alert').val();
    var titulo:any = $('#titulo_alert').val();
    var descripcion:any = $('#descripcion_alert').val();
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
    // var ver2 = new Date(time + 5000);
    // var ver = new Date(new Date().getTime() + 5000);
    // console.log(ver2);
    // console.log(ver);
    this.utilities.peticionHttp<response>(
                  'post',
                  `${this.utilities.baseApiUrl}api/Alertas/agregarAlerta`,
                  {   
                      'fecha':fecha, 
                      'hora':hora,
                      'titulo':titulo,
                      'descripcion':descripcion,
                      'uuid':uuid,
                      'time':time,
                      
                  }).pipe()
        .subscribe(
          data => {
         
            this.utilities.openNotification(
              data.data,
              titulo,
              descripcion,
              'alarm_icon',
              time
            );
            this.router.navigate(['home']);
            this.utilities.presentAlert('success','Se ha Agregado la alerta',false,0);
          },
          error => {
            this.utilities.presentAlert('error','Ha ocurrido un error al enviar peticion',false,0); 

        });
    
  }
}
