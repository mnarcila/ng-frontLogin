import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrdenRsType, OrdenService, StatusType, DetalleOrdenService, OrdenM, DetalleOrden } from '../_restOrdenes';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ordenes',
  templateUrl: './ordenes.component.html',
  styleUrls: ['./ordenes.component.scss']
})
export class OrdenesComponent implements OnInit {

  angForm: FormGroup;
  tablaOrdenes: boolean = false;
  listOrdenes: OrdenM[] = [];
  listaDetalle: DetalleOrden[] = [];
  consultaTip: String;
  habilitaCrear: boolean;
  panelConsultar: boolean = false;
  panelCrear: boolean = false;
  panelActualizar:boolean = false;
  panelDetOrden:boolean = false;
  //panelEditarOrden:boolean = false;

  constructor(
    private ordenesApi: OrdenService,
    private detalleApi: DetalleOrdenService,
    private auth: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) { }



  ngOnInit() {
    console.log('entre al oninit');
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
      consultaId: ['', Validators.required],
      cliente: ['', Validators.required],
      producto: ['', Validators.required],
      paramConsulta: ['', Validators.required],
      tipoConsulta: ['', Validators.required],
      clienteID: ['', Validators.required],
      direccionID: ['', Validators.required],
      valTotal: ['', Validators.required],
      cantProductos: ['', Validators.required],
      fechaSol: ['', Validators.required],
      fechaAprob: ['', Validators.required],
      fechaCierre: ['', Validators.required],
      eIdOrden: ['',Validators.required],
      eCliente: ['', Validators.required],
      eDireccion: ['', Validators.required],
      eValTotal: ['', Validators.required],
      eCantidad: ['', Validators.required],
      eFechaSol: ['', Validators.required],
      eFechaAprob: ['', Validators.required],
      eFechaCierre: ['', Validators.required],
      eEstado: ['', Validators.required]

    });
  }

  mostrarPanelConsulta(): void {
    if(!this.panelConsultar){
      this.panelConsultar = true;
      this.panelActualizar = false;
      this.panelCrear = false;
      //this.panelEditarOrden = false;
    }
  }

  mostrarPanelActualizar(): void {
    if(!this.panelActualizar){
      this.panelConsultar = false;
      this.panelActualizar = true;
      this.panelCrear = false;
      this.tablaOrdenes = false;
      //this.panelEditarOrden = false;
    }
  }

  mostrarPanelCrear(): void {
    if(!this.panelCrear){
      this.panelConsultar = false;
      this.panelActualizar = false;
      this.panelCrear = true;
      this.tablaOrdenes = false;
      //this.panelEditarOrden = false;
    }
  }

  procesarResponse(pValue: OrdenRsType) {

    console.log('procesarResponse ordenResponse');
    console.log(pValue);
    //this.productoRsType = pValue;
    //console.log(pValue.productos);
    this.listOrdenes.push(...pValue.datosBasicos.ordenes);
    //console.log("size: " + this.tablaProductos.length);
    //console.log("0: " + this.tablaProductos[0].nombre);
  }


  /**
   * Consulta la orden que tenga id el parametro enviado
   * @param ordenId id de la orden a consultar
   */
  colsultarOrdenXid(id: number): void {
    //this.listOrdenes = [];
    //if (this.angForm.controls.consultaId.value != '' && this.angForm.controls.consultaId.value != null) {
      this.tablaOrdenes = true;
      this.ordenesApi.conultarOrdenPorId('1', '1', id).subscribe(
        value => setTimeout(() => {
          const prd = value;
          this.procesarResponse(value);
        }, 200),
        error => console.error(JSON.stringify(error)),
        () => console.log('done')
      );
    //}
  }

  colsultarOrdenEstado(idEstado: number): void {
    this.listOrdenes = [];
    this.tablaOrdenes = true;
    this.ordenesApi.conultarOrdenesPorEstado('1', '1', idEstado).subscribe(
      value => setTimeout(() => {
        const prd = value;
        this.procesarResponse(value);
      }, 200),
      error => console.error(JSON.stringify(error)),
      () => console.log('done')
    );
  }

  colsultarOrdenXCliente(cliente: string ): void {
    //this.listOrdenes = [];
    //if (this.angForm.controls.cliente.value != '' && this.angForm.controls.cliente.value != null) {
      this.tablaOrdenes = true;
      this.ordenesApi.conultarOrdenPorCliente('1', '1', cliente).subscribe(
        value => setTimeout(() => {
          const prd = value;
          this.procesarResponse(value);
        }, 200),
        error => console.error(JSON.stringify(error)),
        () => console.log('done')
      );
    //}
  }

  colsultarOrdenXProducto(producto: number): void {
    this.listOrdenes = [];
    if (this.angForm.controls.producto.value != '' && this.angForm.controls.producto.value != null) {
      this.tablaOrdenes = true;
      this.ordenesApi.conultarOrdenesPorIdProducto('1', '1', producto).subscribe(
        value => setTimeout(() => {
          const prd = value;
          this.procesarResponse(value);
        }, 200),
        error => console.error(JSON.stringify(error)),
        () => console.log('done')
      );
    }
  }

  consultaGenerica(): void {
    this.listOrdenes = [];
    this.consultaTip =  this.angForm.controls.tipoConsulta.value;
    if (this.consultaTip != '' && this.consultaTip != null && this.consultaTip != '' && this.consultaTip != null) {
      //console.log('valor:' + this.angForm.controls.paramConsulta.value);
      switch (this.angForm.controls.tipoConsulta.value) {
        case '1': {
          console.log("entre 1: "+ this.angForm.controls.paramConsulta.value);
          this.colsultarOrdenEstado(this.angForm.controls.paramConsulta.value); 
          break;
        }
        case '2': {
          //console.log("entre 2");
          this.colsultarOrdenXCliente(this.angForm.controls.paramConsulta.value);
          break;
        }
        case '3': {
          //console.log("entre 3");
          break;
        }
        case '4': {
          //console.log("entre 4"); 
          this.colsultarOrdenXProducto(this.angForm.controls.paramConsulta.value);
          break;
        }
        case '5': {
          //console.log("entre 5"); 
          this.colsultarOrdenXid(this.angForm.controls.paramConsulta.value);
          break;
        }
        default: {
          console.log("entre default");
          break;
        }
      }
    }

  }

  crearOrdPanel(): void {
    if(this.habilitaCrear){
      this.habilitaCrear = false;
    }else {
      this.habilitaCrear = true;
    }
  }

  crearOrden(): void {
    let orden: OrdenM = {};
    orden.idCliente = this.angForm.controls.clienteID.value;
    orden.idDireccion = this.angForm.controls.direccionID.value;
    orden.valorTotal = this.angForm.controls.valTotal.value;
    orden.cantidadProductos = this.angForm.controls.cantProductos.value;
    orden.fechaSolicitud = this.angForm.controls.fechaSol.value;
    orden.fechaAprobacion = this.angForm.controls.fechaAprob.value;
    orden.fechaCierre = this.angForm.controls.fechaCierre.value;
    orden.estado = 1;
    console.log(orden);
    this.ordenesApi.registrarOrden('1', '1', orden).subscribe(
      value => setTimeout(() => {
        const prd = value;
        //this.consultaEspecifica(value.productos[0].idProducto);
        console.log(value);
      }, 200),
      error => console.error(JSON.stringify(error)),
      () => console.log('done')
    );
  }

  verDetalle(orden: OrdenM):void{
    console.log("entre al detalle");
    this.panelDetOrden = true;
    this.listaDetalle = [];
    this.detalleApi.conultarDetalleOrdenPorIdOrden('1', '1', orden.idOrden).subscribe(
      value => setTimeout(() => {
        const prd = value;
        this.procesarResponseDetalle(value);
      }, 200),
      error => console.error(JSON.stringify(error)),
      () => console.log('done')
    );
    
  }

  procesarResponseDetalle(object: OrdenRsType) {
    console.log(object);
    this.listaDetalle.push(...object.datosBasicos.detalles);
  }

  editarOrden(orden:OrdenM):void{
    this.panelActualizar = true;
    this.panelDetOrden = false;
    this.angForm.controls.eIdOrden.setValue(orden.idOrden);
    this.angForm.controls.eCliente.setValue(orden.idCliente);
    this.angForm.controls.eDireccion.setValue(orden.idDireccion);
    this.angForm.controls.eValTotal.setValue(orden.valorTotal);
    this.angForm.controls.eCantidad.setValue(orden.cantidadProductos);
    this.angForm.controls.eFechaSol.setValue(orden.fechaSolicitud);
    this.angForm.controls.eFechaAprob.setValue(orden.fechaAprobacion);
    this.angForm.controls.eFechaCierre.setValue(orden.fechaCierre);
    this.angForm.controls.eEstado.setValue(orden.estado);
  }

  ActualizarOrden():void{
    let orden:OrdenM ={};
    orden.idOrden = this.angForm.controls.eIdOrden.value;
    console.log("eIdOrden: " + orden.idOrden);
    orden.idCliente = this.angForm.controls.eCliente.value;
    console.log(orden);
    orden.idDireccion = this.angForm.controls.eDireccion.value;
    orden.valorTotal = this.angForm.controls.eValTotal.value;
    orden.cantidadProductos = this.angForm.controls.eCantidad.value;
    orden.fechaSolicitud = this.angForm.controls.eFechaSol.value;
    orden.fechaAprobacion = this.angForm.controls.eFechaAprob.value;
    orden.fechaCierre = this.angForm.controls.eFechaCierre.value;
    orden.estado = this.angForm.controls.eEstado.value;
    this.ordenesApi.actualizarOrdenPorId('1', '1', orden.idOrden, orden).subscribe(
      value => setTimeout(() => {
        const prd = value;
        this.procesarResponseDetalle(value);
      }, 200),
      error => console.error(JSON.stringify(error)),
      () => console.log('done')
    );
    this.panelActualizar = false;
  }
}
