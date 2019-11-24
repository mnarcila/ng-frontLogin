import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrdenRsType, OrdenService, StatusType, DetalleOrdenService, OrdenM, DetalleOrden } from '../_restOrdenes';
import { Router, ActivatedRoute } from '@angular/router';
import { Listas, Estados, tipoIdentificacion, ListaProveedores } from '../Paramentricos/Listas';
import { ClienteService, Direccion, Cliente } from '../_restClientes';
import { ProductoService, Producto } from '../_restProducto';
import { RolesService, Roles } from 'app/_restRoles';
import { NgxSpinnerService } from 'ngx-spinner';
import { envioPagoService } from 'app/_restEnvioPago/envioPago.Service';
import { tarjetaService } from 'app/_tarjetaCredito/tarjeta.service';
import { environment } from 'environments/environment.prod';


declare var $: any;

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
  panelActualizar: boolean = false;
  panelDetOrden: boolean = false;
  listaEstados2: Estados[] = new Listas().estados;
  panelBuscarCliente: boolean = false;
  listaTipoId: tipoIdentificacion[] = new Listas().listaTipoId;
  nombreCliente: string;
  idCliente: number;
  userCliente: string;
  panelBuscarDireccion: boolean = false;
  direcciones: Direccion[];
  idDireccion: number;
  textDireccion: string;
  PanelCrearDetalle: boolean = false;
  panelBuscarProducto: boolean = false;
  listaProveedor: ListaProveedores[] = new Listas().listaProveedores;
  panelSeleccionProducto: boolean = false;
  tablaProductos: Producto[] = [];
  pIdProducto: number;
  listaRoles: Roles[];

  constructor(
    private envioPagoApi: envioPagoService,
    private tarjetaApi: tarjetaService,
    private ordenesApi: OrdenService,
    private detalleApi: DetalleOrdenService,
    private auth: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private clienteApi: ClienteService,
    private productoApi: ProductoService,
    private rolesServices: RolesService,
    public spinner: NgxSpinnerService,
  ) { }



  ngOnInit() {
    this.permisosRoles();
    //console.log('entre al oninit');
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
      eIdOrden: ['', Validators.required],
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
      cTipoId: ['', Validators.required],
      dtIdOrden: ['', Validators.required],
      dtCantidad: ['', Validators.required],
      dtProveedor: ['', Validators.required],
      pNombre: ['', Validators.required],
      pValorUnitario: ['', Validators.required],
      coutas: ['', Validators.required],
      tcNum: ['', Validators.required],
      tcFec: ['', Validators.required],
      tcCvc: ['', Validators.required],
      cuotas: ['', Validators.required],
    });
  }

  mostrarPanelConsulta(): void {
    //cuatro es el rol para consulta de ordenes
    if (this.validarPermisos(4) || this.validarPermisos(5)) {
      if (!this.panelConsultar) {
        this.panelConsultar = true;
        this.panelActualizar = false;
        this.panelCrear = false;
        this.panelBuscarCliente = false;
        this.panelBuscarDireccion = false;
        this.PanelCrearDetalle = false;
        this.panelBuscarProducto = false;
      }
    } else {
      this.mostrarNotificacion('Acceso Denegado', 'No tiene permiso para esta función', 'danger');
    }
  }

  mostrarPanelActualizar(): void {
    if (!this.panelActualizar) {
      this.panelConsultar = false;
      this.panelActualizar = true;
      this.panelCrear = false;
      this.tablaOrdenes = false;
      //this.panelEditarOrden = false;
    }
  }

  mostrarPanelCrear(): void {
    if (this.validarPermisos(5)) {
      if (!this.panelCrear) {
        this.panelConsultar = false;
        this.panelActualizar = false;
        this.panelCrear = true;
        this.tablaOrdenes = false;
        this.listaDetalle = [];
        this.panelDetOrden = false;
        this.PanelCrearDetalle = false;
        this.panelBuscarProducto = false;
      }
    } else {
      this.mostrarNotificacion('Acceso denegado', 'No tiene permiso para esta función', 'danger');
    }
  }

  procesarResponse(pValue: OrdenRsType) {

    console.log('procesarResponse ordenResponse');
    console.log(pValue);
    this.listOrdenes.push(...pValue.datosBasicos.ordenes);

  }


  /**
   * Consulta la orden que tenga id el parametro enviado
   * @param ordenId id de la orden a consultar
   */
  colsultarOrdenXid(id: number): void {
    if (id != null) {
      this.spinner.show();
      this.tablaOrdenes = true;
      this.ordenesApi.conultarOrdenPorId('1', '1', id).subscribe(
        value => setTimeout(() => {
          const prd = value;
          this.procesarResponse(value);
        }, 200),
        error => {
          this.mostrarNotificacion('Consulta de Ordenes', 'se presento un error, por favor notifique al administrador', 'danger');
          console.error(JSON.stringify(error))
        },
        () => console.log('done')
      );
      this.spinner.hide();
    } else {
      this.mostrarNotificacion('Error de datos', 'Por favor verifique los datos ingresados', 'danger');
    }
  }

  colsultarOrdenEstado(idEstado: number): void {
    this.listOrdenes = [];
    this.tablaOrdenes = true;
    this.ordenesApi.conultarOrdenesPorEstado('1', '1', idEstado).subscribe(
      value => setTimeout(() => {
        const prd = value;
        this.procesarResponse(value);
      }, 200),
      error => {
        this.mostrarNotificacion('Consulta de Orden', 'Se presento un error, por favor notifique al administrador', 'danger');
        console.error(JSON.stringify(error))
      },
      () => console.log('done')
    );
  }

  colsultarOrdenXCliente(cliente: string): void {
    this.listOrdenes = [];
    if (cliente != '' || cliente != null) {
      this.tablaOrdenes = true;
      this.ordenesApi.conultarOrdenPorCliente('1', '1', cliente).subscribe(
        value => setTimeout(() => {
          const prd = value;
          this.procesarResponse(value);
        }, 200),
        error => {
          this.mostrarNotificacion('Consulta de Orden', 'Se presento un error, por favor notifique al administrador', 'danger');
          console.error(JSON.stringify(error))
        },
        () => console.log('done')
      );
    } else {
      this.mostrarNotificacion('Error de datos', 'Por favor verifique los datos ingresados', 'danger');
    }
  }

  colsultarOrdenXProducto(producto: string): void {
    console.log('valor producto ' + producto);
    this.listOrdenes = [];
    if (producto != '' && producto != null) {
      console.log('pase el if');
      this.tablaOrdenes = true;
      this.ordenesApi.conultarOrdenesPorIdProducto('1', '1', producto.toUpperCase()).subscribe(
        value => setTimeout(() => {
          const prd = value;
          this.procesarResponse(value);
        }, 200),
        error => {
          this.mostrarNotificacion('Consulta de Orden', 'Se presento un error, por favor notifique al administrador', 'danger');
          console.error(JSON.stringify(error))
        },
        () => console.log('done')
      );
    } else {
      this.mostrarNotificacion('Error de datos', 'Por favor verifique los datos ingresados', 'danger');
    }
  }

  consultaGenerica(): void {
    this.panelDetOrden = false;
    this.listOrdenes = [];
    this.consultaTip = this.angForm.controls.tipoConsulta.value;
    let parametro = this.angForm.controls.paramConsulta.value;
    if (this.consultaTip != '' && this.consultaTip != null && parametro != '' && parametro != null) {
      //console.log('valor:' + this.angForm.controls.paramConsulta.value);
      switch (this.angForm.controls.tipoConsulta.value) {
        case '1': {
          console.log("entre 1: " + this.angForm.controls.paramConsulta.value);
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
    } else {
      this.mostrarNotificacion('Error de datos', 'Por favor verifique los datos ingresados', 'danger');
    }

  }

  crearOrdPanel(): void {
    if (this.habilitaCrear) {
      this.habilitaCrear = false;
    } else {
      this.habilitaCrear = true;
      this.tablaOrdenes = false;
    }
  }

  verDetalle(orden: OrdenM): void {
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

  editarOrden(orden: OrdenM): void {
    if (this.validarPermisos(5)) {
      this.panelActualizar = true;
      this.panelDetOrden = false;
      this.tablaOrdenes = false;
      this.angForm.controls.eIdOrden.setValue(orden.idOrden);
      this.angForm.controls.eCliente.setValue(orden.nomcliente);
      this.angForm.controls.eDireccion.setValue(orden.direccion);
      this.angForm.controls.eValTotal.setValue(orden.valorTotal);
      this.angForm.controls.eCantidad.setValue(orden.cantidadProductos);
      this.angForm.controls.eFechaSol.setValue(orden.fechaSolicitud);
      this.angForm.controls.eFechaAprob.setValue(orden.fechaAprobacion);
      this.angForm.controls.eFechaCierre.setValue(orden.fechaCierre);
      this.angForm.controls.eEstado.setValue(orden.estado);
    } else {
      this.mostrarNotificacion('Acceso Denegado', 'No tiene permiso para esta función', 'danger');
    }
  }

  ActualizarOrden(): void {
    let orden: OrdenM = {};
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
        this.mostrarNotificacion('Actualizar Orden', 'Se ha actualizado la orden correctamente', 'success');
      }, 200),
      error => {
        this.mostrarNotificacion('Actualizar Orden', 'Se presento un error, por favor notifique al administrador', 'danger');
        console.error(JSON.stringify(error))
      },
      () => console.log('done')
    );
    this.panelActualizar = false;
    this.listOrdenes = [];
    this.colsultarOrdenXid(orden.idOrden);
    this.listOrdenes = [];
  }

  mostrarPanelBuscarCliente(): void {
    this.panelBuscarCliente = true;
  }

  ConsultaCliente(): void {
    let tipoID = this.angForm.controls.cTipoId.value;
    let identi = this.angForm.controls.cIdentificacion.value;
    //console.log(tipoID+' '+identi);
    if ((tipoID != null && tipoID != '') && (identi != null && identi != '')) {
      this.clienteApi.consultarClientePorIdentificacion('1', '1', tipoID, identi).subscribe(
        value => setTimeout(() => {
          const prd = value;
          this.nombreCliente = value.cliente.nombre + ' ' + value.cliente.apellido;
          this.panelBuscarCliente = false;
          this.userCliente = value.cliente.usuario;
          this.idCliente = value.cliente.idCliente;
          console.log("cliente " + this.idCliente);
        }, 200),
        error => {
          this.mostrarNotificacion('Consulta Cliente', 'Se presento un error, por favor notifique al administrador', 'danger');
          console.error(JSON.stringify(error))
        },
        () => console.log('done')
      );
    } else {
      this.mostrarNotificacion('Error de datos', 'Por favor verifique los datos ingresados', 'danger');
    }
  }

  mostrarPanelDireccion(): void {
    this.panelBuscarDireccion = true;
    this.consultaDireccion();
  }

  consultaDireccion(): void {
    if (this.userCliente != null || this.userCliente != '') {
      this.clienteApi.direccionesCliente('1', '1', this.userCliente).subscribe(
        value => setTimeout(() => {
          const prd = value;
          //console.log(value);
          this.direcciones = value.direcciones;
        }, 200),
        error => {
          this.mostrarNotificacion('Consulta Dirección', 'Se presento un error, por favor notifique al administrador', 'danger');
          console.error(JSON.stringify(error))
        },
        () => console.log('done')
      );
    } else {
      this.mostrarNotificacion('Error de datos', 'Por favor verifique los datos ingresados', 'danger');
    }
  }

  verDireccion(dir: Direccion): void {
    this.idDireccion = dir.iddireccion;
    this.textDireccion = dir.direccion;
    this.panelBuscarDireccion = false;
    //console.log("direccion "+this.idDireccion);
  }


  crearOrden(): void {
    //console.log("cliente "+this.idCliente+" direccion "+this.idDireccion);
    if (this.idCliente != null || this.idDireccion != null) {
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
      this.listOrdenes = [];
      this.ordenesApi.registrarOrden('1', '1', orden).subscribe(
        value => setTimeout(() => {
          const prd = value;
          //this.procesarResponse(value);
          this.colsultarOrdenXid(value.datosBasicos.ordenes[0].idOrden);
          this.mostrarNotificacion('Creación de Orden', 'Se ha creado la orden correctamente', 'success');
        }, 200),
        error => {
          this.mostrarNotificacion('Creación de Orden', 'Se presento un error, por favor notifique al administrador', 'danger');
          console.error(JSON.stringify(error))
        },
        () => console.log('done')
      );
      this.tablaOrdenes = true;
      this.panelCrear = false;
    } else {
      this.mostrarNotificacion('Error de datos', 'Por favor verifique los datos ingresados', 'danger');
    }
  }

  mostrarPanelCrearDetalle(): void {
    if (this.validarPermisos(5)) {
      this.PanelCrearDetalle = true;
      this.panelDetOrden = false;
      this.listaDetalle = [];
      this.panelConsultar = false;
      this.panelBuscarCliente = false;
      this.panelBuscarDireccion = false;
      this.panelCrear = false;
      this.tablaOrdenes = false;
      this.panelActualizar = false;
    } else {
      this.mostrarNotificacion('Acceso denegado', 'No tiene permiso para esta función', 'danger');
    }
  }

  mostrarPanelProducto(): void {
    this.panelBuscarProducto = true;
  }

  buscarProducto(): void {
    let nombre = this.angForm.controls.pNombre.value;
    if (nombre != null || nombre != '') {
      this.productoApi.conultarProductoPorNombre('1', '1', this.angForm.controls.pNombre.value).subscribe(
        value => setTimeout(() => {
          const prd = value;
          //this.consultaEspecifica(value.productos[0].idProducto);
          console.log(value);
          this.panelSeleccionProducto = true;
          this.tablaProductos = value.productos;
        }, 200),
        error => {
          this.mostrarNotificacion('Busqueda de Producto', 'Se presento un error, por favor notifique al administrador', 'danger');
          console.error(JSON.stringify(error))
        },
        () => console.log('done')
      );
    } else {
      this.mostrarNotificacion('Error de datos', 'Por favor verifique los datos ingresados', 'danger');
    }
  }

  seleccionarProducto(productoz: Producto): void {
    console.log("impirmir productoz " + productoz);
    this.angForm.controls.pNombre.setValue(productoz.nombre);
    this.angForm.controls.pValorUnitario.setValue(productoz.valorBase);
    this.pIdProducto = productoz.idProducto;
    this.panelSeleccionProducto = false;
    this.panelBuscarProducto = false;
  }

  crearDetalle(): void {
    let flag = true;
    if (this.angForm.controls.dtCantidad.value == null || this.angForm.controls.dtCantidad.value == '') {
      flag = false;
    } if (this.angForm.controls.dtIdOrden.value == null || this.angForm.controls.dtIdOrden.value == '') {
      flag = false;
    } if (this.angForm.controls.pIdProducto.value == null || this.angForm.controls.pIdProducto.value == '') {
      flag = false;
    } if (this.angForm.controls.dtProveedor.value == null || this.angForm.controls.dtProveedor.value == '') {
      flag = false;
    } if (this.angForm.controls.pValorUnitario.value == null || this.angForm.controls.pValorUnitario.value == '') {
      flag = false;
    }

    if (flag) {
      let detalle: DetalleOrden = {};
      detalle.cantidad = this.angForm.controls.dtCantidad.value;
      detalle.estado = 'ACTIVA';
      detalle.idOrden = this.angForm.controls.dtIdOrden.value;
      detalle.idProducto = this.pIdProducto;
      detalle.idProveedor = this.angForm.controls.dtProveedor.value;
      detalle.valorUnidad = this.angForm.controls.pValorUnitario.value;
      //console.log('crear detalle '+ detalle);
      this.detalleApi.registrarDetalleOrden('1', '1', detalle).subscribe(
        value => setTimeout(() => {
          //const prd = value;
          //console.log(value);
          this.panelDetOrden = false;
          this.PanelCrearDetalle = false;
          this.mostrarNotificacion('Creación del detalle', 'Se ha creado exitosamente', 'success');
        }, 200),
        error => {
          this.mostrarNotificacion('Creación del detalle', 'Se presento un error, por favor notifique al administrador', 'danger');
          console.error(JSON.stringify(error))
        },
        () => console.log('done')
      );
    } else {
      this.mostrarNotificacion('Error de datos', 'Por favor verifique los datos ingresados', 'danger');
    }

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

  permisosRoles() {
    this.rolesServices.consultarPermisosRol('1', '1', this.auth.getLoggedName()).subscribe(
      value => setTimeout(() => {
        var roles = value.datosBasicos;
        this.listaRoles = roles;
        //console.log("permisos "+ this.listaRoles);
      }, 200),
      error => {
      },
      () => console.log('done')
    );
    //return false;
  }

  validarPermisos(id: number): boolean {
    let per: number;
    for (let index = 0; index < this.listaRoles.length; index++) {
      per = this.listaRoles[index].idrol;
      //console.log("permisos " + per);
      if (per == id) {
        //console.log('son iguales ');
        return true;
      }
    }
    return false;
  }

  mapearEstados(est: number): string {
    console.log("estado ");
    switch (est) {
      case 1:
        return "Creada";
      case 2:
        return "Por Validar";
      case 3:
        return "Aprobada";
      case 4:
        return "Procesada";
      case 5:
        return "Entregada";
      case 6:
        return "Cancelada";
      case 7:
        return "Rechazada";
      default:
        return "Sin estado";
    }
  }
  renderPreEnvio = false;
  editarPreEnvio(pOrden: OrdenM) {
    this.renderPreEnvio = true;
    this.ordenEnvio = pOrden;
    //consultar cliente y direcciones 

    this.clienteApi.consultarClientePorId('1', '1', pOrden.idCliente).subscribe(
      value1 => setTimeout(() => {
        this.clienteEnvio = value1.cliente;
        this.clienteApi.direccionesCliente('1', '1', value1.cliente.usuario).subscribe(
          value2 => setTimeout(() => {
            value2.direcciones.forEach(element => {
              if (element.iddireccion = pOrden.idDireccion) {
                this.direccionEnvio = element;
              }
            });
          }, 200),
          error => {
            this.mostrarNotificacion('Consulta Dirección', 'Se presento un error, por favor notifique al administrador', 'danger');
            console.error(JSON.stringify(error))
          },
          () => console.log('done')
        );
      }, 200),
      error => {
        this.mostrarNotificacion('Consulta Cliente', 'Se presento un error, por favor notifique al administrador', 'danger');
        console.error(JSON.stringify(error))
      },
      () => console.log('done')
    );
  }
  clienteEnvio: Cliente;
  ordenEnvio: OrdenM;
  direccionEnvio: Direccion;
  enviarEnvio() {
    var tcNUmero = this.angForm.controls.tcNum.value;
    var tcFecha = this.angForm.controls.tcFec.value;
    var tcCvc = this.angForm.controls.tcCvc.value;
    var cuotas: string = this.angForm.controls.cuotas.value;
    if (cuotas == null || cuotas == " ") {
      cuotas = "1";
    }
    this.verificarTC(tcCvc, tcFecha, tcNUmero, cuotas);

  }

  verificarTC(cvc, fecha, tc, cuotas) {
    this.spinner.show();
    //validar aqui
    let cabecera: CabeceraEntrada = {
      clienteId: environment.tcClientId,
      ip: '127.0.0.1'
    }
    let cuerpo: CuerpoMensajeVerificar = {
      cvc: cvc,
      fechaVence: fecha,
      numeroTarjeta: tc
    }
    this.tarjetaApi.verificarTS(cabecera, cuerpo).subscribe(
      (response) => {
        let res: RootVerifyResponse = response;
        if (res.creditcardverifyresponse.cabeceraSalida.tipoRespuesta) {
          this.realizarPagoTC(cvc, fecha, tc, cuotas);

        } else {
          this.mostrarNotificacion('Error de datos', 'Error validando TC intente con una diferente.', 'warn');
          this.spinner.hide();
        }
        //si todo sale bien debe ir a consultar el otro servicio 
      }, (error) => {
        this.mostrarNotificacion('Error de datos', "Error validando TC:" + error, 'danger');
        this.spinner.hide();
      });
  }


  realizarPagoTC(cvc, fecha, tc, cuotas): void {
    let cabecera: CabeceraEntrada = {
      clienteId: environment.tcClientId,
      ip: '127.0.0.1'
    }
    let cuerpo: CuerpoMensajePago = {
      numeroTarjeta: tc,
      fechaVence: fecha,
      cvc: cvc,
      numeroCuotas: cuotas,
      valorPago: this.ordenEnvio.valorTotal
    }
    console.log(cuerpo)
    this.tarjetaApi.realizarCompra(cabecera, cuerpo).subscribe(
      response => {
        let res: RealizarPagoResponse = response;
        if (res.creditcardpaymentresponse.cabaceraSalida.tipoRespuesta) {


          this.enviarProcesoPago1(this.ordenEnvio.idOrden);

        } else {
          this.mostrarNotificacion('Error de datos', 'No se pudo realizar el pago, intente con otra TC', 'danger');
          this.spinner.hide();
        }

      }, error => {
        // this.mostrarNotiicacion('Error validando TC:' + error, 'error')
        this.mostrarNotificacion('Error de datos', 'Error realizando compra con la tarjeta', 'danger');
        this.spinner.hide();
      });
  }

  enviarProcesoPago1(idOrden: number) {
    console.log("enviarProcesoPago1::" + idOrden);
    var items: Item[] = [];
    this.detalleApi.conultarDetalleOrdenPorIdOrden('1', '1', idOrden).subscribe(
      value => {
        value.datosBasicos.detalles.forEach(element => {
          let tmpItem: Item = {
            nombreProducto: '',
            cantidad: element.cantidad,
            idOrden: element.idOrden,
            idProducto: '' + element.idProducto,
            iddetorden: element.idDetOrden,
            valorUnidad: element.valorUnidad
          };
          items.push(tmpItem)
        });
        this.enviarProcesoPago2(idOrden, items)
      }, error => {
        console.log("error enviarprocesopago1");
        this.spinner.hide();
      }
    );
  }
  enviarProcesoPago2(idOrden: number, items: Item[]) {
    console.log("enviarProcesoPago2::" + idOrden + "|" + items);

    var nomCategoria = () => {
      switch (this.clienteEnvio.idCategoria) {
        case 1: {
          return 'Dorado'
        }
        case 2: {
          return 'Plateado'
        }
        case 3: {
          return 'Platino'
        }
      }
    }
    let ordenTrRequest: ordenTrRequest = {
      mail: this.clienteEnvio.email,
      nomCat: nomCategoria(),
      proveedor: '',
      nombre: this.clienteEnvio.nombre,
      apellido: this.clienteEnvio.apellido,
      cantidadProductos: this.ordenEnvio.cantidadProductos,
      ciudad: this.direccionEnvio.ciudad,
      direccion: this.direccionEnvio.direccion,
      estado: this.direccionEnvio.ciudad,
      pais: this.direccionEnvio.pais,
      valorTotal: this.ordenEnvio.valorTotal,
      idCategoria: this.clienteEnvio.idCategoria,
      idOrden: idOrden,
      items: items
    };
    this.spinner.hide();
    this.envioPagoApi.enviarPago(ordenTrRequest).subscribe(
      value => {
        if (value.status.statusCode == 200) {
          console.log("final Proceso:200")
          this.renderPreEnvio = false;
          this.mostrarNotificacion('Envio exitoso', 'Envio realizado', 'success');
          // this.ordenEnvio.estado = 1;
          // this.ordenesApi.actualizarOrdenPorId('1', '1', this.ordenEnvio.idOrden, this.ordenEnvio).subscribe(
          //   value => setTimeout(() => {
          //     const prd = value;
          //     this.procesarResponseDetalle(value);
          //     this.mostrarNotificacion('Actualizar Orden', 'Se ha actualizado la orden correctamente', 'success');
          //   }, 200),
          //   error => {
          //     this.mostrarNotificacion('Actualizar Orden', 'Se presento un error, por favor notifique al administrador', 'danger');
          //     console.error(JSON.stringify(error))
          //   },
          //   () => console.log('done')
          // );

        } else if (value.status.statusCode == 201) {
          console.log("final Proceso:201")
          this.renderPreEnvio = false;
          this.mostrarNotificacion('Envio exitoso', 'Envio realizado', 'success');

        } else {
          console.log("erro")
        }
      }

    );
  }



}
