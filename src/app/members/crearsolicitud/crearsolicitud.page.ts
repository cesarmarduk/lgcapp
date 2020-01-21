import { Component, OnInit } from '@angular/core';
import { UtilitiesService } from '../../services/utilities.service';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpClient, HttpHeaders, HttpRequest, HttpParams, HttpResponse,HttpErrorResponse  } from '@angular/common/http';
import { first } from 'rxjs/operators';
import { HtmlParser } from '@angular/compiler';
declare var jQuery:any;
declare var $:any;
interface resp {
  status:any;
  message:any;

}
@Component({
  selector: 'app-crearsolicitud',
  templateUrl: './crearsolicitud.page.html',
  styleUrls: ['./crearsolicitud.page.scss'],
})
export class CrearsolicitudPage implements OnInit {
  fileData: File = null;
  previewUrl:any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  title: string;
  perfil:string;
  id:any;
  

  constructor(private utilities: UtilitiesService,private rutaActiva: ActivatedRoute,private http: HttpClient) { 

    this.title = 'SOLICITAR CONTRATO';
  }

  ngOnInit() {
    const that = this;
    that.perfil=this.rutaActiva.snapshot.params.perfil;
    that.id=this.rutaActiva.snapshot.params.id;
  
  }
  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    this.preview();
  }

  preview() {
    // Show preview 
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();      
    reader.readAsDataURL(this.fileData); 
    reader.onload = (_event) => { 
      this.previewUrl = reader.result; 
    }
}

  doSomethingOnScroll($event:Event  ){
    this.utilities.doSomethingOnScroll($event);
  }
  crearSolicitud($event:Event  ){
    const formData = new FormData();
    var tipo_contrato=$('#tipo_contrato_sol').val();
    var ciudad=$('#ciudad_sol').val();
    var monto_renta=$('#monto_renta_sol').val().trim();
    var fecha_probable=$('#fecha_probable_sol').val();
    var nombre_contacto=$('#nombre_contacto_sol').val();
    var telefono_contacto=$('#telefono_contacto_sol').val();
    var email_contacto=$('#email_contacto_sol').val();
    var nombre_arrendador=$('#nombre_arrendador_sol').val();
    var telefono_arrendador=$('#telefono_arrendador_sol').val();
    var email_arrendador=$('#email_arrendador_sol').val();
    var nombre_inquilino=$('#nombre_inquilino_sol').val();
    var telefono_inquilino=$('#telefono_inquilino_sol').val();
    var email_inquilino=$('#email_inquilino_sol').val();
    var nombre_garante=$('#nombre_garante_sol').val();
    var telefono_garante=$('#telefono_garante_sol').val();
    var email_garante=$('#email_garante_sol').val();
    var aval=$('input[name=aval]:checked').val();
    var descripcion_escritura=$('#descripcion_escritura_sol').val();
    var tipo_arrendador=$('#tipo_arrendador_sol').val();
    var tipo_inquilino=$('#tipo_inquilino_sol').val();
    var tipo_garante=$('#tipo_garante_sol').val();

    if(tipo_contrato=='0'){
      this.utilities.presentAlert('warning','Escoja un tipo de Contrato',false,4000);
      return false;
    }
    if(ciudad=='0'){
      this.utilities.presentAlert('warning','Escoga una ciudad',false,4000);
      return false;
    }
    if(nombre_contacto.trim().length==0){
      this.utilities.presentAlert('warning','Escriba un nombre para contacto',false,4000);
      return false;
    }
    if(telefono_contacto.trim().length==0){
      this.utilities.presentAlert('warning','Escriba un telefono para contacto',false,4000);
      return false;
    }
    if(email_contacto.trim().length==0){
      this.utilities.presentAlert('warning','Escriba un Email para contacto',false,4000);
      return false;
    }
    if(aval==undefined){
     aval=0;
    }
    formData.append('tipo_arrendador',tipo_arrendador);
    formData.append('tipo_inquilino',tipo_inquilino);
    formData.append('tipo_garante',tipo_garante);
    formData.append('tipo_contrato',tipo_contrato);
    formData.append('ciudad',ciudad);
    formData.append('monto_renta',monto_renta);
    formData.append('fecha_probable',fecha_probable);
    formData.append('nombre_contacto',nombre_contacto);
    formData.append('telefono_contacto',telefono_contacto);
    formData.append('email_contacto',email_contacto);
    formData.append('nombre_arrendador',nombre_arrendador);
    formData.append('telefono_arrendador',telefono_arrendador);
    formData.append('email_arrendador',email_arrendador);
    formData.append('nombre_inquilino',nombre_inquilino);
    formData.append('telefono_inquilino',telefono_inquilino);
    formData.append('email_inquilino',email_inquilino);
    formData.append('nombre_garante',nombre_garante);
    formData.append('telefono_garante',telefono_garante);
    formData.append('email_garante',email_garante);
    formData.append('aval',aval);
    formData.append('descripcion_escritura',descripcion_escritura);
    formData.append('perfil',this.perfil);
    formData.append('id',this.id);
    var cantFiles=0;
  
    if($('#escritura_sol')[0].files.length >0){
      cantFiles++;
      formData.append('escritura',$('#escritura_sol')[0].files[0]);
   
    }
  

    this.http.post<resp>(`${this.utilities.baseApiUrl}api/Polizas/crearSolicitud`, formData,this.utilities.httpOptionsFile).subscribe(
      (response) => {
        console.log(response);
        this.utilities.presentAlert(response.status,response.message,true,0);
        var tipo_contrato=$('#tipo_contrato_sol').val('');
        var ciudad=$('#ciudad_sol').val('');
        var monto_renta=$('#monto_renta_sol').val('');
        var fecha_probable=$('#fecha_probable_sol').val('');
        var nombre_contacto=$('#nombre_contacto_sol').val('');
        var telefono_contacto=$('#telefono_contacto_sol').val('');
        var email_contacto=$('#email_contacto_sol').val('');
        var nombre_arrendador=$('#nombre_arrendador_sol').val('');
        var telefono_arrendador=$('#telefono_arrendador_sol').val('');
        var email_arrendador=$('#email_arrendador_sol').val('');
        var nombre_inquilino=$('#nombre_inquilino_sol').val('');
        var telefono_inquilino=$('#telefono_inquilino_sol').val('');
        var email_inquilino=$('#email_inquilino_sol').val('');
        var nombre_garante=$('#nombre_garante_sol').val('');
        var telefono_garante=$('#telefono_garante_sol').val('');
        var email_garante=$('#email_garante_sol').val('');
        var aval=$('input[name=aval]:checked').val('');
        var descripcion_escritura=$('#descripcion_escritura_sol').val('');
        var tipo_arrendador=$('#tipo_arrendador_sol').val('');
        var tipo_inquilino=$('#tipo_inquilino_sol').val('');
        var tipo_garante=$('#tipo_garante_sol').val('');
      },
      (error) =>   this.utilities.presentAlert(error.status,error.message,false,0)
    )
  
  
  }
}
