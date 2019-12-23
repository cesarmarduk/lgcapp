import { Component, OnInit } from '@angular/core';
import { UtilitiesService } from '../../services/utilities.service';
import { ActivatedRoute, Params } from '@angular/router';
import { first } from 'rxjs/operators';
declare var jQuery:any;
declare var $:any;
class Poliza {
  id: number;
  costo: string;
  folio: string;
  directivo: string;
  asesor: string;
  agente: string;
  fecha_inicio:string;
  fecha_termino:string;
  fecha_firma:string;
  fecha_renovada:string;
  fecha_pago:string;
  fecha_creada:string;
  estado_pago:string;
  admin_pago:string;
  hora_firma:string;
  lugar:string;
  renovacion:string;
  seccion_dia:string;
  extincion:string;
  iva:string;
  estado_jurisdiccion:string;
  delegacion_jurisdiccion:string;
  interes_moratorio:string;
  descontar_ext:string;
  vigenciapromo:string;
  motivotermino:string;
  status:string;
  seg_inq:string;
  seg_pro:string;
  seg_gar:string;
  enviarRenovacion:string;
  confirmacion_prop:string;
  seguimiento_prop:string;
  renovacion_prop:string;
  recordatorio_inq:string;
  renovacion_inq:string;
  pagomes:string;
  avisomes:string;
  type:string;
  direccion:string;
  ejecutivo:string;
  correoEjecutivo:string;
  incumplimientos:string;
  correoAsesor:string;
  inmobiliaria:string;
  correoInmobiliaria:string;
  correoAgente:string;
  propietarios:EDatos;
  inquilinos:EDatos;
  garantes:EDatos;
  monto_renta:string;
  deposito:string;
  ivaInmueble:string;
  mantenimientoInmueble:string;
  mantenimiento_costInmueble:string;
  mantenimiento_dondeInmueble:string;
}
interface EDatos{
  tipo:string;
  nombre:string;
  direccion:string;
  telefono:string;
  correo:string;
}
interface Incumplimientos{
  id:string;
  abierto:string;
  asunto:string;
  observaciones:string;
  fecha:string;
  hora:string;
  nombre:string;
  telefono:string;
  email:string;
  incumple:string;
  accion:string;
  archivo:string;
  subidopor:string;
}
class incumplimintoResponse {
  id:string;
  abierto:string;
  asunto:string;
  observaciones:string;
  fecha:string;
  hora:string;
  nombre:string;
  telefono:string;
  email:string;
  incumple:string;
  accion:string;
  archivo:string;
  subidopor:string;
}

@Component({
  selector: 'app-poliza',
  templateUrl: './poliza.page.html',
  styleUrls: ['./poliza.page.scss'],
})
export class PolizaPage implements OnInit {
  title: string;
  id: number;
  costo: string;
  folio: string;
  directivo: string;
  asesor: string;
  agente: string;
  fecha_inicio:string;
  fecha_termino:string;
  fecha_firma:string;
  fecha_renovada:string;
  fecha_pago:string;
  fecha_creada:string;
  estado_pago:string;
  admin_pago:string;
  hora_firma:string;
  lugar:string;
  renovacion:string;
  seccion_dia:string;
  extincion:string;
  iva:string;
  estado_jurisdiccion:string;
  delegacion_jurisdiccion:string;
  interes_moratorio:string;
  descontar_ext:string;
  vigenciapromo:string;
  motivotermino:string;
  status:string;
  seg_inq:string;
  seg_pro:string;
  seg_gar:string;
  enviarRenovacion:string;
  confirmacion_prop:string;
  seguimiento_prop:string;
  renovacion_prop:string;
  recordatorio_inq:string;
  renovacion_inq:string;
  pagomes:string;
  avisomes:string;
  type:string;
  direccion:string;
  ejecutivo:string;
  correoEjecutivo:string;
  incumplimientos:string;
  correoAsesor:string;
  inmobiliaria:string;
  correoInmobiliaria:string;
  correoAgente:string;
  propietarios:EDatos;
  inquilinos:EDatos;
  garantes:EDatos;
  monto_renta:string;
  deposito:string;
  ivaInmueble:string;
  mantenimientoInmueble:string;
  mantenimiento_costInmueble:string;
  mantenimiento_dondeInmueble:string;
  place:string='pol';
  conIncumplimientos:Incumplimientos;
  constructor(private utilities: UtilitiesService,private rutaActiva: ActivatedRoute) { 

    this.title = 'PROTECCION';
  }
  ngOnInit() {
    const that = this;
    that.id=that.rutaActiva.snapshot.params.id;
  
    that.utilities.peticionHttp<Poliza>('get',`${that.utilities.baseApiUrl}api/polizas/getPolizaDetailsById/${that.id}`).pipe(first())
    .subscribe(
      resp => {
        that.title = resp.folio;
        that.costo = resp.costo;
        that.folio = resp.folio;
        that.directivo = resp.directivo;
        that.asesor = resp.asesor;
        that.correoAsesor = resp.correoAsesor;
        that.agente = resp.agente;
        that.correoAgente = resp.correoAgente;
        that.fecha_inicio = resp.fecha_inicio;
        that.fecha_termino = resp.fecha_termino;
        that.fecha_firma = resp.fecha_firma;
        that.estado_pago = resp.estado_pago;
        that.admin_pago = resp.admin_pago;
        that.hora_firma = resp.hora_firma;
        that.seccion_dia = resp.seccion_dia;
        that.fecha_pago = resp.fecha_pago;
        that.lugar = resp.lugar;
        that.renovacion = resp.renovacion;
        that.fecha_creada = resp.fecha_creada;
        that.extincion = resp.extincion;
        that.iva = resp.iva;
        that.estado_jurisdiccion = resp.estado_jurisdiccion;
        that.delegacion_jurisdiccion = resp.delegacion_jurisdiccion;
        that.interes_moratorio = resp.interes_moratorio;
        that.descontar_ext = resp.descontar_ext;
        that.vigenciapromo = resp.vigenciapromo;
        that.status = resp.status;
        that.fecha_renovada = resp.fecha_renovada;
        that.seg_inq = resp.seg_inq;
        that.seg_pro = resp.seg_pro;
        that.seg_gar = resp.seg_gar;
        that.enviarRenovacion = resp.enviarRenovacion;
        that.confirmacion_prop = resp.confirmacion_prop;
        that.seguimiento_prop = resp.seguimiento_prop;
        that.renovacion_prop = resp.renovacion_prop;
        that.recordatorio_inq = resp.recordatorio_inq;
        that.renovacion_inq = resp.renovacion_inq;
        that.pagomes = resp.pagomes;
        that.avisomes = resp.avisomes;
        that.type = resp.type;
        that.incumplimientos = resp.incumplimientos;
        that.direccion = resp.direccion;
        that.monto_renta = resp.monto_renta;
        that.propietarios= resp.propietarios;
        that.inquilinos=  resp.inquilinos;
        that.garantes=  resp.garantes;
        that.ejecutivo=  resp.ejecutivo;
        that.correoEjecutivo=  resp.correoEjecutivo;
        that.correoInmobiliaria=  resp.correoInmobiliaria;
        that.inmobiliaria=  resp.inmobiliaria;
     
      },
      error => {
        that.utilities.presentAlert('info','Error al Obtener Datos, Comprueba tu conexión a internet :(',false,0);  
      }
    );
  }
  doSomethingOnScroll($event:Event  ){
    this.utilities.doSomethingOnScroll($event);
  }
  nuevaAlerta(folio,id){
    
    this.utilities.presentAlert('info',`Genera Alerta ${folio}, ${id}`,false,0); 
  
  }

  verIncumplimientos(folio,id){
    
    this.utilities.peticionHttp<incumplimintoResponse>('get',`${this.utilities.baseApiUrl}api/polizas/getIncumplimientosByPolizaId/${id}`).pipe(first())
    .subscribe(
        data => {
          this.conIncumplimientos=data;
            console.log( this.conIncumplimientos);
            $('#incumplePopup').modal('show');
        
        },
        error => {
            this.utilities.presentAlert('success','Ha ocurrido un error al Obtener Datos',false,0); 
        });
  
  }
}
