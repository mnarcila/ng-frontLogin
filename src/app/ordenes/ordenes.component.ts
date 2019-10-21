import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrdenRsType, OrdenService, StatusType, DetalleOrdenService, OrdenM, DetalleOrden } from '../_restOrdenes';
import { Router, ActivatedRoute } from '@angular/router';
import { Listas, Estados, tipoIdentificacion, ListaProveedores } from '../Paramentricos/Listas';
import { ClienteService, Direccion} from '../_restClientes';
import { ProductoService, Producto } from '../_restProducto';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

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
  //listEstado: string[];
  listaEstados2: Estados[] = new Listas().estados;
  panelBuscarCliente: boolean = false;
  listaTipoId: tipoIdentificacion[] = new Listas().listaTipoId;
  nombreCliente:string ;
  idCliente: number;
  userCliente:string ;
  panelBuscarDireccion: boolean = false;
  direcciones: Direccion[] ;
  idDireccion: number;
  textDireccion: string;
  PanelCrearDetalle: boolean = false;
  panelBuscarProducto: boolean = false;
  listaProveedor: ListaProveedores[] = new Listas().listaProveedores;
  panelSeleccionProducto: boolean = false;
  tablaProductos: Producto[] = [];
  pIdProducto: number;

  constructor(
    private ordenesApi: OrdenService,
    private detalleApi: DetalleOrdenService,
    private auth: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private clienteApi: ClienteService,
    private productoApi: ProductoService,
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
      eEstado: ['', Validators.required],
      //cIdOrden: ['',Validators.required],
      cCliente: ['', Validators.required],
      cDireccion: ['', Validators.required],
      cValTotal: ['', Validators.required],
      cCantidad: ['', Validators.required],
      cFechaSol: ['', Validators.required],
      cFechaAprob: ['', Validators.required],
      cFechaCierre: ['', Validators.required],
      cEstado: ['', Validators.required],
      cIdentificacion: ['', Validators.required],
      cTipoId: ['',Validators.required],
      dtIdOrden: ['',Validators.required],
      dtCantidad: ['',Validators.required],
      dtProveedor: ['', Validators.required],
      pNombre: ['',Validators.required],
      pValorUnitario: ['',Validators.required],
    });
  }

  mostrarPanelConsulta(): void {
    if(!this.panelConsultar){
      this.panelConsultar = true;
      this.panelActualizar = false;
      this.panelCrear = false;
      this.panelBuscarCliente = false;
      this.panelBuscarDireccion = false;
      this.PanelCrearDetalle = false;
      this.panelBuscarProducto = false;
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
      this.listaDetalle  = [];
      this.panelDetOrden = false;
      this.PanelCrearDetalle = false;
      this.panelBuscarProducto = false;
    }
  }

  procesarResponse(pValue: OrdenRsType) {

    console.log('procesarResponse ordenResponse');
    console.log(pValue);
    //this.productoRsType = pValue;
    //console.log(pValue.productos);
    this.listOrdenes.push(...pValue.datosBasicos.ordenes);
    //console.log("size: " + this.estados.retornarEstadosOrden());
    //this.listEstado = this.estados.retornarEstadosOrden();
    
  }


  /**
   * Consulta la orden que tenga id el parametro enviado
   * @param ordenId id de la orden a consultar
   */
  colsultarOrdenXid(id: number): void {
      this.tablaOrdenes = true;
      this.ordenesApi.conultarOrdenPorId('1', '1', id).subscribe(
        value => setTimeout(() => {
          const prd = value;
          this.procesarResponse(value);
        }, 200),
        error => console.error(JSON.stringify(error)),
        () => console.log('done')
      );
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
    this.listOrdenes = [];
    if (cliente != '' && cliente != null) {
      this.tablaOrdenes = true;
      this.ordenesApi.conultarOrdenPorCliente('1', '1', cliente).subscribe(
        value => setTimeout(() => {
          const prd = value;
          this.procesarResponse(value);
        }, 200),
        error => console.error(JSON.stringify(error)),
        () => console.log('done')
      );
    }
  }

  colsultarOrdenXProducto(producto: string): void {
    console.log('valor producto '+ producto);
    this.listOrdenes = [];
    if (producto != '' && producto != null) {
      console.log('pase el if');
      this.tablaOrdenes = true;
      this.ordenesApi.conultarOrdenesPorIdProducto('1', '1', producto.toUpperCase()).subscribe(
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
          console.log('consulta generica'); 
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
      this.tablaOrdenes =false;
    }
  }

  verDetalle(orden: OrdenM):void{
    console.log("entre al detalle");
    this.panelDetOrden = true;
    this.panelActualizar = false;
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
    console.log(orden);
    this.ordenesApi.actualizarOrdenPorId('1', '1', orden.idOrden, orden).subscribe(
      value => setTimeout(() => {
        const prd = value;
        this.procesarResponseDetalle(value);
      }, 200),
      error => console.error(JSON.stringify(error)),
      () => console.log('done')
    );
    this.panelActualizar = false;
    this.listOrdenes = [];
    this.colsultarOrdenXid(orden.idOrden);
    this.listOrdenes = [];
  }

  mostrarPanelBuscarCliente():void {
    this.panelBuscarCliente = true;
  }

  ConsultaCliente():void{
    let tipoID = this.angForm.controls.cTipoId.value;
    let identi = this.angForm.controls.cIdentificacion.value;
    console.log(tipoID+' '+identi);
    this.clienteApi.consultarClientePorIdentificacion('1', '1', tipoID, identi).subscribe(
      value => setTimeout(() => {
        const prd = value;
        this.nombreCliente = value.cliente.nombre +' '+value.cliente.apellido;
        this.panelBuscarCliente = false;
        this.userCliente = value.cliente.usuario;
        this.idCliente = value.cliente.idCliente;
      }, 200),
      error => console.error(JSON.stringify(error)),
      () => console.log('done')
    );
  }

  mostrarPanelDireccion():void{
    this.panelBuscarDireccion = true;
    this.consultaDireccion();
  }

  consultaDireccion():void{
    this.clienteApi.direccionesCliente('1', '1', this.userCliente).subscribe(
      value => setTimeout(() => {
        const prd = value;
        //console.log(value);
        this.direcciones = value.direcciones;
      }, 200),
      error => console.error(JSON.stringify(error)),
      () => console.log('done')
    );
  }

  verDireccion(dir:Direccion):void{
    this.idDireccion = dir.iddireccion;
    this.textDireccion = dir.direccion;
    this.panelBuscarDireccion = false;
    console.log('direccion '+dir.iddireccion);
  }

  
  crearOrden(): void {
    let orden: OrdenM = {};
    let today = new Date();
    let dd = String(today.getDate());
    let mm = String(today.getMonth() + 1); 
    let yyyy = today.getFullYear();
    let fecha = dd + '/' + mm + '/' + yyyy;
    orden.idCliente = this.idCliente;
    orden.idDireccion = this.idDireccion;
    orden.valorTotal = 0;
    orden.cantidadProductos = 0;
    orden.fechaSolicitud = fecha;
    orden.origen = "OMS";
    orden.comentario = "Comentario Generico";
    orden.estado = 1;
    console.log(orden);
    this.ordenesApi.registrarOrden('1', '1', orden).subscribe(
      value => setTimeout(() => {
        const prd = value;
        //this.consultaEspecifica(value.productos[0].idProducto);
        console.log(value);
        this.procesarResponse(value);
      }, 200),
      error => console.error(JSON.stringify(error)),
      () => console.log('done')
    );
    this.tablaOrdenes=true;
    
  }

  mostrarPanelCrearDetalle():void{
    this.PanelCrearDetalle = true;
    this.panelDetOrden = false;
    this.listaDetalle = [];
    this.panelConsultar = false;
    this.panelBuscarCliente = false;
    this.panelBuscarDireccion = false;
    this.panelCrear = false;
    this.tablaOrdenes = false;
    this.panelActualizar = false;
  }

  mostrarPanelProducto():void{
    this.panelBuscarProducto = true;
  }

  buscarProducto():void{
    console.log("entre a busqueda producto "+this.angForm.controls.pNombre.value);
    this.productoApi.conultarProductoPorNombre('1', '1', this.angForm.controls.pNombre.value).subscribe(
      value => setTimeout(() => {
        const prd = value;
        //this.consultaEspecifica(value.productos[0].idProducto);
        console.log(value);
        this.panelSeleccionProducto = true;
        this.tablaProductos = value.productos;
      }, 200),
      error => console.error(JSON.stringify(error)),
      () => console.log('done')
    );
  }

  seleccionarProducto(productoz: Producto): void{
    console.log("impirmir productoz "+productoz);
    this.angForm.controls.pNombre.setValue(productoz.nombre);
    this.angForm.controls.pValorUnitario.setValue(productoz.valorBase);
    this.pIdProducto = productoz.idProducto;
    this.panelSeleccionProducto = false;
    this.panelBuscarProducto = false;
  }

  crearDetalle(): void{
    let detalle: DetalleOrden = {};
    detalle.cantidad = this.angForm.controls.dtCantidad.value;
    detalle.estado = 'ACTIVA';
    detalle.idOrden = this.angForm.controls.dtIdOrden.value;
    detalle.idProducto = this.pIdProducto;
    detalle.idProveedor = this.angForm.controls.dtProveedor.value;
    detalle.valorUnidad = this.angForm.controls.pValorUnitario.value;
    console.log('crear detalle '+ detalle);
    this.detalleApi.registrarDetalleOrden('1', '1', detalle).subscribe(
    value => setTimeout(() => {
      //const prd = value;
      console.log(value);
      this.panelDetOrden = false;
    }, 200),
    error => console.error(JSON.stringify(error)),
    () => console.log('done')
  );
  }
}
