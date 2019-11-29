import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AuthService } from 'app/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReporteService, OrdenRsType, ProductoRsType, CategoriaRsType, Orden2RsType, Orden3RsType, ClienteRsType } from 'app/_restReportes';
import { formatDate, DatePipe } from "@angular/common";
import { Cliente } from 'app/_restReportes/model/cliente';
import { ClienteService } from 'app/_restClientes';

declare var $: any;

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss']
})
export class ReportesComponent implements OnInit {

  angForm: FormGroup;
  panelFiltro: boolean = false;
  panelOrdenesCerradas: boolean = false;
  tablaOrdenesCerradas: OrdenRsType[];
  panelTablaOrdenesCerradas: boolean = false;
  panelMasVendidos: boolean = false;
  panelTablaMasVendidos: boolean = false;
  tablaProductosMasVendidos: ProductoRsType[];
  panelCategoriasMasVendidos: boolean = false;
  panelOrdenesAbiertas: boolean = false;
  panelOrdDinero: boolean = false;
  panelClientesFacturados: boolean = false;
  panelTablaCategorias: boolean = false;
  tablaCategorias: CategoriaRsType[];
  tablaOrdAbiertas: Orden2RsType[];
  tablaOrdCerDinero: Orden3RsType[];
  panelTablaClienteFac: boolean = false;
  tablaClientesFac: ClienteRsType[];
  panelOrdCerradasDinero = false;
  PanelFiltroCliente: boolean = false;
  tablaClienteProductos: Cliente[];
  PanelTablaClienteProductos: boolean = false;
  tablaCLiente: Cliente;
  panelTablaCliente: boolean = false;
  
  constructor(
    public dialog: MatDialog,
    private auth: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private reportesapi: ReporteService,
    private datePipe: DatePipe,
    private clienteApi: ClienteService,
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
      idProducto: ['',Validators.required],
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

  mostrarPanelOrdenesCerradas() {
    this.panelFiltro = true;

    this.panelOrdenesCerradas = true;
    this.panelMasVendidos = false;
    this.panelCategoriasMasVendidos = false;
    this.panelClientesFacturados = false;
    this.panelOrdCerradasDinero = false;
    this.PanelFiltroCliente = false;

    this.panelTablaOrdenesCerradas = false;
    this.panelTablaMasVendidos = false;
    this.panelTablaCategorias = false;
    this.panelOrdenesAbiertas = false;
    this.panelOrdDinero = false;
    this.panelTablaClienteFac = false;
    this.PanelTablaClienteProductos = false;
  }

  mostrarPanelMasVendidos() {
    this.panelFiltro = true;
    this.panelOrdenesCerradas = false;
    this.panelMasVendidos = true;
    this.panelCategoriasMasVendidos = false;
    this.panelClientesFacturados = false;
    this.panelOrdCerradasDinero = false;
    this.PanelFiltroCliente = false;

    this.panelTablaOrdenesCerradas = false;
    this.panelTablaMasVendidos = false;
    this.panelTablaCategorias = false;
    this.panelOrdenesAbiertas = false;
    this.panelOrdDinero = false;
    this.panelTablaClienteFac = false;
    this.PanelTablaClienteProductos = false;
  }

  mostrarPanelCategorias() {
    this.panelFiltro = true;
    this.panelOrdenesCerradas = false;
    this.panelMasVendidos = false;
    this.panelCategoriasMasVendidos = true;
    this.panelClientesFacturados = false;
    this.panelOrdCerradasDinero = false;
    this.PanelFiltroCliente = false;

    this.panelTablaOrdenesCerradas = false;
    this.panelTablaMasVendidos = false;
    this.panelTablaCategorias = false;
    this.panelOrdenesAbiertas = false;
    this.panelOrdDinero = false;
    this.panelTablaClienteFac = false;
    this.PanelTablaClienteProductos = false;
  }

  mostrarPanelClientesFacturados() {
    this.panelFiltro = true;
    this.panelOrdenesCerradas = false;
    this.panelMasVendidos = false;
    this.panelCategoriasMasVendidos = false;
    this.panelClientesFacturados = true;
    this.panelOrdCerradasDinero = false;
    this.PanelFiltroCliente = false;

    this.panelTablaOrdenesCerradas = false;
    this.panelTablaMasVendidos = false;
    this.panelTablaCategorias = false;
    this.panelOrdenesAbiertas = false;
    this.panelOrdDinero = false;
    this.panelTablaClienteFac = false;
    this.PanelTablaClienteProductos = false;
    
  }

  mostrarPanelOrdCerrDinero() {
    this.panelFiltro = true;

    this.panelOrdenesCerradas = false;
    this.panelMasVendidos = false;
    this.panelCategoriasMasVendidos = false;
    this.panelClientesFacturados = false;
    this.panelOrdCerradasDinero = true;

    this.panelTablaOrdenesCerradas = false;
    this.panelTablaMasVendidos = false;
    this.panelTablaCategorias = false;
    this.panelOrdenesAbiertas = false;
    this.panelOrdDinero = false;
    this.panelTablaClienteFac = false;
    this.PanelFiltroCliente = false;
    this.PanelTablaClienteProductos = false;
  }

  mostrarPanelClientesProductos(){
    this.panelFiltro = false;

    this.panelOrdenesCerradas = false;
    this.panelMasVendidos = false;
    this.panelCategoriasMasVendidos = false;
    this.panelClientesFacturados = false;
    this.panelOrdCerradasDinero = false;
    this.PanelFiltroCliente = true;
    this.PanelTablaClienteProductos = false;

    this.panelTablaOrdenesCerradas = false;
    this.panelTablaMasVendidos = false;
    this.panelTablaCategorias = false;
    this.panelOrdenesAbiertas = false;
    this.panelOrdDinero = false;
    this.panelTablaClienteFac = false;
  }

  mostrarPanelOrdAbiertas() {
    this.panelFiltro = false;
    this.panelOrdenesCerradas = false;
    this.panelMasVendidos = false;
    this.panelCategoriasMasVendidos = false;
    this.panelClientesFacturados = false;
    this.panelOrdCerradasDinero = false;
    this.PanelFiltroCliente = false;

    this.panelTablaOrdenesCerradas = false;
    this.panelTablaMasVendidos = false;
    this.panelTablaCategorias = false;
    this.panelOrdenesAbiertas = true;
    this.panelOrdDinero = false;
    this.panelTablaClienteFac = false;
    this.PanelTablaClienteProductos = false;

    this.tablaOrdAbiertas = [];
    this.reportesapi.ordenesAbiertas('1', '1').subscribe(
      value2 => setTimeout(() => {
        this.tablaOrdAbiertas = value2.orden;
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

  buscarOrdCerradasDinero() {


    this.panelOrdenesCerradas = false;
    this.panelMasVendidos = false;
    this.panelCategoriasMasVendidos = false;
    this.panelClientesFacturados = false;
    this.panelOrdCerradasDinero = false;
    this.PanelFiltroCliente = false;

    if (this.angForm.controls.fechaInicioOC.value != null || this.angForm.controls.fechaFinOC.value != null ||
      this.angForm.controls.fechaInicioOC.value != '' || this.angForm.controls.fechaFinOC.value != '') {
      let fechaInicio = this.formatFecha(this.angForm.controls.fechaInicioOC.value);
      let fechaFin = this.formatFecha(this.angForm.controls.fechaFinOC.value);

      this.panelTablaOrdenesCerradas = false;
      this.panelTablaMasVendidos = false;
      this.panelTablaCategorias = false;
      this.panelOrdenesAbiertas = false;
      this.panelOrdDinero = true;
      this.panelTablaClienteFac = false;
      this.PanelTablaClienteProductos = false;

      this.tablaOrdCerDinero = [];
      this.reportesapi.ordenesCerradas('1', '1', fechaInicio, fechaFin).subscribe(
        value2 => setTimeout(() => {
          this.tablaOrdCerDinero = value2.orden;
        }, 200),
        error => {
          this.mostrarNotificacion('Consulta Reporte', 'se presento un error, por favor notifique al administrador', 'danger');
          console.error(JSON.stringify(error))
        },
        () => console.log('done')
      );
    } else {
      this.mostrarNotificacion('Consulta Reporte', 'Ingrese los datos por favor', 'danger');
    }

  }

  buscarOrdenesCerradas() {
    if (this.angForm.controls.fechaInicioOC.value != null || this.angForm.controls.fechaFinOC.value != null ||
      this.angForm.controls.fechaInicioOC.value != '' || this.angForm.controls.fechaFinOC.value != '') {
      let fechaInicio = this.formatFecha(this.angForm.controls.fechaInicioOC.value);
      let fechaFin = this.formatFecha(this.angForm.controls.fechaFinOC.value);
      //console.log(fechaInicio);
      //console.log(fechaFin);
      this.panelTablaOrdenesCerradas = true;
      this.tablaOrdenesCerradas = [];
      if ((fechaInicio != null && fechaFin != null) || (fechaInicio != '' && fechaFin != '')) {
        this.reportesapi.noOrdenes('1', '1', fechaInicio, fechaFin).subscribe(
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
      } else {
        this.mostrarNotificacion('Consulta Reporte', 'Existen datos vacios en el formulario', 'danger');
      }
    }else{
      this.mostrarNotificacion('Consulta Reporte', 'Ingrese los datos por favor', 'danger');
    }

  }

  buscarProductosMasVendidos() {
    if (this.angForm.controls.fechaInicioOC.value != null || this.angForm.controls.fechaFinOC.value != null ||
      this.angForm.controls.fechaInicioOC.value != '' || this.angForm.controls.fechaFinOC.value != '') {
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
    }else{
      this.mostrarNotificacion('Consulta Reporte', 'Ingrese los datos por favor', 'danger');
    }
    
  }

  buscarCategorias() {
    if(this.angForm.controls.fechaInicioOC.value != null || this.angForm.controls.fechaFinOC.value != null ||
      this.angForm.controls.fechaInicioOC.value != '' || this.angForm.controls.fechaFinOC.value != ''){
        this.panelTablaCategorias = true;
        let fechaInicio = this.formatFecha(this.angForm.controls.fechaInicioOC.value);
        let fechaFin = this.formatFecha(this.angForm.controls.fechaFinOC.value);
        this.tablaCategorias = [];
        this.reportesapi.categoriasVendidas('1', '1', fechaInicio, fechaFin).subscribe(
          value2 => setTimeout(() => {
            this.tablaCategorias = value2.categoria;
          }, 200),
          error => {
            this.mostrarNotificacion('Consulta Reporte', 'se presento un error, por favor notifique al administrador', 'danger');
            console.error(JSON.stringify(error))
          },
          () => console.log('done')
        );
    }else{
      this.mostrarNotificacion('Consulta Reporte', 'Ingrese los datos por favor', 'danger');
    }
    
  }

  buscarClientesFacturados() {
    if(this.angForm.controls.fechaInicioOC.value != null || this.angForm.controls.fechaFinOC.value != null ||
      this.angForm.controls.fechaInicioOC.value != '' || this.angForm.controls.fechaFinOC.value != ''){
        this.panelTablaClienteFac = true;
        let fechaInicio = this.formatFecha(this.angForm.controls.fechaInicioOC.value);
        let fechaFin = this.formatFecha(this.angForm.controls.fechaFinOC.value);
        this.tablaClientesFac = [];
        this.reportesapi.clientesFacturados('1', '1', fechaInicio, fechaFin).subscribe(
          value2 => setTimeout(() => {
            this.tablaClientesFac = value2.cliente;
          }, 200),
          error => {
            this.mostrarNotificacion('Consulta Reporte', 'se presento un error, por favor notifique al administrador', 'danger');
            console.error(JSON.stringify(error))
          },
          () => console.log('done')
        );
    }else{
      this.mostrarNotificacion('Consulta Reporte', 'Ingrese los datos por favor', 'danger');
    }
    
  }

  buscarClienteProducto(){
    this.tablaClienteProductos = [];

    this.panelFiltro = false;
    this.panelOrdenesCerradas = false;
    this.panelMasVendidos = false;
    this.panelCategoriasMasVendidos = false;
    this.panelClientesFacturados = false;
    this.panelOrdCerradasDinero = false;
    this.PanelFiltroCliente = false;

    this.panelTablaOrdenesCerradas = false;
    this.panelTablaMasVendidos = false;
    this.panelTablaCategorias = false;
    this.panelOrdenesAbiertas = false;
    this.panelOrdDinero = false;
    this.panelTablaClienteFac = false;

    if(this.angForm.controls.idProducto.value != null || this.angForm.controls.idProducto.value != ''){
        this.reportesapi.clientesxProducto('1', '1', this.angForm.controls.idProducto.value).subscribe(
          value2 => setTimeout(() => {
            this.tablaClienteProductos = value2.clientes;
            this.PanelTablaClienteProductos = true;
          }, 200),
          error => {
            this.mostrarNotificacion('Consulta Reporte', 'se presento un error, por favor notifique al administrador', 'danger');
            console.error(JSON.stringify(error))
          },
          () => console.log('done')
        );
    }else{
      this.mostrarNotificacion('Consulta Reporte', 'Ingrese los datos por favor', 'danger');
    }
  }

  verCliente(idcliente:number){
    this.clienteApi.consultarClientePorId('1', '1', idcliente).subscribe(
      value => setTimeout(() => {
        //console.log(value);
        this.tablaCLiente = value.cliente;
        this.panelTablaCliente = true;
      }, 200),
      error => {
        this.mostrarNotificacion('consultarPorId ', 'se presento un error, por favor notifique al administrador', 'danger');
        console.error(JSON.stringify(error))
      },
      () => console.log('done')
    );
  }

  // recibe un string de fecha en formato dd/mm/yyyy y retorna el formato dd-mm-yyyy
  formatFecha(fecha: string): string {
    //console.log(fecha);
    let ano = fecha.substr(0, 4);
    let mes = fecha.substr(5, 2);
    let dia = fecha.substr(8, 2);
    let result = dia + '-' + mes + '-' + ano;
    console.log(result);
    return result;
  }

}
