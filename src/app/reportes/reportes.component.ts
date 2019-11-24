import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AuthService } from 'app/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReporteService, OrdenRsType, ProductoRsType, CategoriaRsType, Orden2RsType, Orden3RsType, ClienteRsType } from 'app/_restReportes';
import { formatDate, DatePipe } from "@angular/common";

declare var $: any;

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss']
})
export class ReportesComponent implements OnInit {

  angForm: FormGroup;
  panelFiltro:boolean = false;
  panelOrdenesCerradas:boolean = false;
  tablaOrdenesCerradas: OrdenRsType[] ;
  panelTablaOrdenesCerradas:boolean = false;
  panelMasVendidos: boolean = false;
  panelTablaMasVendidos: boolean = false;
  tablaProductosMasVendidos: ProductoRsType[];
  panelCategoriasMasVendidos: boolean = false;
  panelOrdenesAbiertas: boolean = false;
  panelOrdDinero: boolean = false;
  panelClientesFacturados: boolean = false;
  panelTablaCategorias:boolean = false ;
  tablaCategorias: CategoriaRsType;
  tablaOrdAbiertas: Orden2RsType[];
  tablaOrdCerDinero: Orden3RsType;
  panelTablaClienteFac: boolean = false;
  tablaClientesFac: ClienteRsType;
  
  constructor(
    public dialog: MatDialog,
    private auth: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private reportesapi: ReporteService,
    private datePipe: DatePipe,
  ) { }

  ngOnInit() {
    if (this.auth.isLoggedIn == false) {
      this.sendLogin();
    }
    this.createForm();
  }

  sendLogin(): void {
    this.router.navigate(["login"]);
  }

  createForm() {
    this.angForm = this.formBuilder.group({
      fechaInicioOC: ['', Validators.required],
      fechaFinOC: ['', Validators.required],
    });
  }

  mostrarNotificacion(pTitulo: String, pTexto: String, pTipo: String) {
    $.notify({
      icon: "notifications",
      message: " "

    }, {
      type: pTipo,
      timer: 2000,
      placement: {
        from: 'bottom',
        align: 'center'
      },
      template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
        '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
        '<i class="material-icons" data-notify="icon">notifications</i> ' +
        '<span data-notify="title">' + pTitulo + '</span> ' +
        '<span data-notify="message">' + pTexto + '</span>' +
        '</div>'
    });
  }

  mostrarPanelOrdenesCerradas(){
    //this.panelFiltro = true;
    this.panelOrdenesCerradas = true;
    this.panelMasVendidos = false;
    this.panelTablaOrdenesCerradas = false;
    this.panelCategoriasMasVendidos = false;
    this.panelOrdenesAbiertas = false;
  }

  mostrarPanelMasVendidos(){
    this.panelOrdenesCerradas = false;
    this.panelMasVendidos = true;
    this.panelTablaOrdenesCerradas = false;
    this.panelCategoriasMasVendidos = false;
    this.panelOrdenesAbiertas = false;
  }

  mostrarPanelCategorias(){
    this.panelOrdenesCerradas = false;
    this.panelMasVendidos = false;
    this.panelCategoriasMasVendidos = true;
    this.panelOrdenesAbiertas = false;
  }

  mostrarPanelClientesFacturados(){
    this.panelOrdenesCerradas = false;
    this.panelMasVendidos = false;
    this.panelCategoriasMasVendidos = true;
    this.panelOrdenesAbiertas = false;
    this.panelClientesFacturados = true;
  }

  mostrarPanelOrdAbiertas(){
    this.panelOrdenesCerradas = false;
    this.panelMasVendidos = false;
    this.panelCategoriasMasVendidos = false;
    this.panelOrdenesAbiertas = true;

    this.tablaOrdAbiertas = [];
    this.reportesapi.ordenesAbiertas('1', '1').subscribe(
      value2 => setTimeout(() => {
       this.tablaOrdAbiertas  = value2.orden;
       //console.log(this.tablaOrdAbiertas.length);
      }, 200),
      error => {
        this.mostrarNotificacion('Consulta Reporte', 'se presento un error, por favor notifique al administrador', 'danger');
        console.error(JSON.stringify(error))
      },
      () => console.log('done')
    );
    this.panelOrdenesAbiertas = true;
  }

  mostrarPanelOrdCerrDinero(){
    this.panelOrdenesCerradas = false;
    this.panelMasVendidos = false;
    this.panelCategoriasMasVendidos = false;
    this.panelOrdenesAbiertas = false;
    this.panelOrdDinero = true;
    let fechaInicio = this.formatFecha(this.angForm.controls.fechaInicioOC.value);
    let fechaFin = this.formatFecha(this.angForm.controls.fechaFinOC.value);


    this.tablaOrdCerDinero = {};
    this.reportesapi.ordenesCerradas('1', '1',fechaInicio,fechaFin).subscribe(
      value2 => setTimeout(() => {
       this.tablaOrdCerDinero = value2.ordenes;
      }, 200),
      error => {
        this.mostrarNotificacion('Consulta Reporte', 'se presento un error, por favor notifique al administrador', 'danger');
        console.error(JSON.stringify(error))
      },
      () => console.log('done')
    );
  }

  buscarOrdenesCerradas(){
    let fechaInicio = this.formatFecha(this.angForm.controls.fechaInicioOC.value);
    let fechaFin = this.formatFecha(this.angForm.controls.fechaFinOC.value);
    //console.log(fechaInicio);
    //console.log(fechaFin);
    this.panelTablaOrdenesCerradas = true;
    this.tablaOrdenesCerradas = [];
    if((fechaInicio != null && fechaFin != null)||(fechaInicio != '' && fechaFin != '')){
    this.reportesapi.noOrdenes('1', '1',fechaInicio,fechaFin).subscribe(
      value2 => setTimeout(() => {
       this.tablaOrdenesCerradas = value2.orden;
       console.log(value2);
       console.log(value2.orden);
       console.log(this.tablaOrdenesCerradas);
      }, 200),
      error => {
        this.mostrarNotificacion('Consulta Reporte', 'se presento un error, por favor notifique al administrador', 'danger');
        console.error(JSON.stringify(error))
      },
      () => console.log('done')
    );
    }else{
      this.mostrarNotificacion('Consulta Reporte', 'Existen datos vacios en el formulario', 'danger');
    }
  }

  buscarProductosMasVendidos(){
    this.panelTablaMasVendidos = true;
    let fechaInicio = this.formatFecha(this.angForm.controls.fechaInicioOC.value);
    //console.log(fechaInicio);
    let fechaFin = this.formatFecha(this.angForm.controls.fechaFinOC.value);
    this.tablaProductosMasVendidos = [];
    this.reportesapi.productosVendidos('1', '1', fechaInicio, fechaFin).subscribe(
      value2 => setTimeout(() => {
       this.tablaProductosMasVendidos = value2.producto;
      }, 200),
      error => {
        this.mostrarNotificacion('Consulta Reporte', 'se presento un error, por favor notifique al administrador', 'danger');
        console.error(JSON.stringify(error))
      },
      () => console.log('done')
    );
  }

  buscarCategorias(){
    this.panelTablaCategorias = true;
    let fechaInicio = this.angForm.controls.fechaInicioOC;
    let fechaFin = this.angForm.controls.fechaFinOC;
    this.tablaCategorias = {};
    this.reportesapi.categoriasVendidas('1', '1', fechaInicio.value, fechaFin.value).subscribe(
      value2 => setTimeout(() => {
       this.tablaCategorias = value2.categorias;
      }, 200),
      error => {
        this.mostrarNotificacion('Consulta Reporte', 'se presento un error, por favor notifique al administrador', 'danger');
        console.error(JSON.stringify(error))
      },
      () => console.log('done')
    );
  }

  buscarClientesFacturados(){
    this.panelTablaClienteFac = true;
    let fechaInicio = this.angForm.controls.fechaInicioOC;
    let fechaFin = this.angForm.controls.fechaFinOC;
    this.tablaClientesFac = {};
    this.reportesapi.clientesFacturados('1', '1',fechaInicio.value,fechaFin.value).subscribe(
      value2 => setTimeout(() => {
       this.tablaClientesFac = value2.clientes;
      }, 200),
      error => {
        this.mostrarNotificacion('Consulta Reporte', 'se presento un error, por favor notifique al administrador', 'danger');
        console.error(JSON.stringify(error))
      },
      () => console.log('done')
    );
  }
  
  // recibe un string de fecha en formato dd/mm/yyyy y retorna el formato dd-mm-yyyy
  formatFecha(fecha: string):string {
    //console.log(fecha);
    let ano = fecha.substr(0,4);
    let mes = fecha.substr(5,2);
    let dia = fecha.substr(8,2);
    let result = dia+'-'+mes+'-'+ano;
    console.log(result);
    return result;
  }
}
