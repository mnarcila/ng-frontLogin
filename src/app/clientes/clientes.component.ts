import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClienteRsType, Cliente, Clientes, ClienteService, ClientesRsType } from "../_restClientes";

import { Router, ActivatedRoute } from '@angular/router';
export interface Estados {
  value: string;
  viewValue: string;
}
export interface Categorias {
  value: string;
  viewValue: string;
}
declare var $: any;

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  estados: Estados[] = [
    { value: 'ACTIVO', viewValue: 'ACTIVO' },
    { value: 'INACTIVO', viewValue: 'INACTIVO' }
  ];

  categoriasMap: Map<number, String>;
  categorias: Categorias[] = [
    { value: '1', viewValue: 'Dorado' },
    { value: '2', viewValue: 'Platino' },
    { value: '3', viewValue: 'Plateado' }
  ];

  loading = false;
  submitted = false;
  angForm: FormGroup;
  angForm1: FormGroup;
  constructor(
    private auth: AuthService,
    private router: Router,
    private clienteApi: ClienteService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
  ) { }

  clienteTabla: Cliente[] = [];

  renderCrear: boolean = false;
  renderConsulta: boolean = false;
  renderEditar: boolean = false;

  createForm() {
    this.angForm = this.formBuilder.group({
      bsc_cliente: ['', Validators.required],
      busquedaC: ['', Validators.required],
      iusuario: ['', Validators.required],
      ipassword: ['', Validators.required],
      inombre: ['', Validators.required],
      iapellido: ['', Validators.required],
      itelefono: ['', Validators.required],
      iemail: ['', Validators.required],
      eclienteId: ['', Validators.required],
      cateProduct: ['', Validators.required],
      estadoProduct: ['', Validators.required],
      eiusuario: ['', Validators.required],
      eipassword: ['', Validators.required],
      einombre: ['', Validators.required],
      eiapellido: ['', Validators.required],
      eitelefono: ['', Validators.required],
      eiemail: ['', Validators.required],
      ecateProduct: ['', Validators.required],
      eestadoProduct: ['', Validators.required],
      //campos de la direccion 
      iddireccionId:['', Validators.required],
      idcliente:['', Validators.required],
      iddireccion:['', Validators.required],
      idPais:['', Validators.required],
      idCiudad:['', Validators.required],
      idTipoDireccion:['', Validators.required],
      idEstado:['', Validators.required],
      //edicion direccion 
      eddireccionId:['', Validators.required],
      edcliente:['', Validators.required],
      eddireccion:['', Validators.required],
      edPais:['', Validators.required],
      edCiudad:['', Validators.required],
      edTipoDireccion:['', Validators.required],
      edEstado:['', Validators.required],

    });
  }
  get f() { return this.angForm.controls; }
  sendLogin(): void {
    this.router.navigate(["login"]);
  }
  ngOnInit() {

    if (this.auth.isLoggedIn == false) {
      this.sendLogin();
    }
    this.createForm();

    //cargar mapa 
    this.categoriasMap = new Map<number, String>();
    this.categoriasMap.set(1, 'Dorado');
    this.categoriasMap.set(2, 'Platino');
    this.categoriasMap.set(3, 'Plateado');

  }


  renderCrearDiv(): void {
    this.renderCrear = true;
    this.renderConsulta = false;
    this.renderEditar = false;
  }

  consultarCategoria(idCategoria: number): String {


    return this.categoriasMap.get(idCategoria);
  }


  editarCliente(): void {
    let cliente: Cliente = {};

    cliente.idCliente = this.angForm.controls.eclienteId.value;
    cliente.nombre = this.angForm.controls.einombre.value;
    cliente.apellido = this.angForm.controls.eiapellido.value;
    cliente.usuario = this.angForm.controls.eiusuario.value;
    cliente.password = this.angForm.controls.eipassword.value;
    cliente.telefono = this.angForm.controls.eitelefono.value;
    cliente.email = this.angForm.controls.eiemail.value;
    cliente.idCategoria = this.angForm.controls.ecateProduct.value;
    cliente.estado = this.angForm.controls.eestadoProduct.value;
    // cliente.origen = 'OMS';

    this.clienteApi.actualizarClientePorId('1', '1', cliente).subscribe(
      value => setTimeout(() => {
        const prd = value;
        this.consultarPorId(cliente.idCliente);
        this.mostrarNotificacion('Actualización de Producto', 'se actualizo con exito', 'success');
      }, 200),
      error => {
        this.mostrarNotificacion('Actualización de Producto', 'se presento un error, por favor notifique al administrador', 'danger');
        console.error(JSON.stringify(error))
      },
      () => console.log('done')
    );
    this.renderCrear = false;
    this.renderConsulta = true;
    this.renderEditar = false;

  }

  procesarResponseRsType(cliente: ClienteRsType): void {

    this.clienteTabla.push(cliente.cliente);
  }

  procesarResponseTabla(cliente: ClientesRsType): void {
    console.log('procesarResponse procesarResponse');
    this.clienteTabla.push(...cliente.clientes);

  }
  

  consultarPorId(clienteId: number) {
    this.clienteTabla = [];
    this.clienteApi.consultarClientePorId('1', '1', clienteId).subscribe(
      value => setTimeout(() => {
        console.log(value);
        this.procesarResponseRsType(value);
        if (value.cliente != null && value.cliente != undefined) {
          this.renderConsulta = true;
        }

      }, 200),
      error => {
        this.mostrarNotificacion('consultarPorId ', 'se presento un error, por favor notifique al administrador', 'danger');
        console.error(JSON.stringify(error))
      },
      () => console.log('done')
    );


  }

  onClick(): void {
    this.renderConsulta = false;
    this.renderCrear = false;
    this.renderEditar = false;
    this.clienteTabla = [];

    console.log(this.angForm.controls.bsc_cliente.value);
    var itemBusqueda = this.angForm.controls.bsc_cliente.value;
    var tipoBusqueda = this.angForm.controls.busquedaC.value;


    if (itemBusqueda != '' && itemBusqueda != null) {

      if (tipoBusqueda == 1) {
        this.consultarPorId(itemBusqueda);
      } else if (tipoBusqueda == 2) {
        this.clienteTabla = [];
        this.clienteApi.consultarClientePorIdentificacion('1', '1', 'CC', itemBusqueda).subscribe(
          value => setTimeout(() => {
            console.log(value);
            this.procesarResponseRsType(value);
            if (value.cliente != null && value.cliente != undefined) {
              this.renderConsulta = true;
            }
          }, 200),
          error => {
            this.mostrarNotificacion('consultarPorId ', 'se presento un error, por favor notifique al administrador', 'danger');
            console.error(JSON.stringify(error))
          },
          () => console.log('done')
        );
      }

    } else {
      this.mostrarNotificacion('consulta', 'Ingrese un concepto de busqueda', 'warning');
    }

  }


  crearCliente(): void {

    let cliente: Cliente = {};


    cliente.nombre = this.angForm.controls.inombre.value;
    cliente.apellido = this.angForm.controls.iapellido.value;
    cliente.usuario = this.angForm.controls.iusuario.value;
    cliente.password = this.angForm.controls.ipassword.value;
    cliente.telefono = this.angForm.controls.itelefono.value;
    cliente.email = this.angForm.controls.iemail.value;
    cliente.idCategoria = this.angForm.controls.cateProduct.value;
    cliente.estado = this.angForm.controls.estadoProduct.value;
    cliente.origen = 'OMS';

    this.clienteApi.registrarCliente('1', '1', cliente).subscribe(
      value => setTimeout(() => {
        const prd = value;
        this.consultarPorId(value.idClienteCreado);
        this.mostrarNotificacion('Creación de Producto', 'Producto creado con exito', 'success');
      }, 200),
      error => {
        this.mostrarNotificacion('Creación de Producto', 'se presento un error, por favor notifique al administrador', 'danger');
        console.error(JSON.stringify(error))
      },
      () => console.log('done')
    );
    this.renderCrear = false;
    this.renderConsulta = true;
    this.renderEditar = false;
  }

  direccion(){

  }


  editar(cliente: Cliente): void {


    this.angForm.controls.eclienteId.setValue(cliente.idCliente);
    this.angForm.controls.eiusuario.setValue(cliente.usuario);
    this.angForm.controls.eipassword.setValue(cliente.password);
    this.angForm.controls.einombre.setValue(cliente.nombre);
    this.angForm.controls.eiapellido.setValue(cliente.apellido);
    this.angForm.controls.eitelefono.setValue(cliente.telefono);
    this.angForm.controls.eiemail.setValue(cliente.email);

    this.angForm.controls.ecateProduct.setValue(cliente.idCategoria);
    this.angForm.controls.eestadoProduct.setValue(cliente.estado);

    this.renderCrear = false;
    this.renderConsulta = false;
    this.renderEditar = true;
  }



  mostrarNotificacion(pTitulo: String, pTexto: String, pTipo: String) {


    // const type = ['','info','success','warning','danger'];


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

}
