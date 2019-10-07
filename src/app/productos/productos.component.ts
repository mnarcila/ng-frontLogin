import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductosInner, Producto, ProductoService, ProductoRsType, StatusType } from "../_restProducto";
import { Router, ActivatedRoute } from '@angular/router';
import {MatDividerModule} from '@angular/material/divider';
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
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {

  estados: Estados[] = [
    { value: 'ACTIVO', viewValue: 'ACTIVO' },
    { value: 'INACTIVO', viewValue: 'INACTIVO' }
  ];
  categorias: Categorias[] = [
    { value: '1', viewValue: 'Celulares0' }, 
    { value: '1', viewValue: 'Celulares1' }, 
  ];

  renderCrear: boolean = false;
  renderConsulta: boolean = false;
  renderEditar: boolean = false;
  

  title = 'OMS-kallsonys';
  loading = false;
  submitted = false;
  angForm: FormGroup;
  angForm1: FormGroup;
  productoRsType: ProductoRsType;
  tablaProductos: ProductosInner[] = [];

  constructor(
    private auth: AuthService,
    private router: Router,
    private productoApi: ProductoService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
  ) { }

  createForm() {
    this.angForm = this.formBuilder.group({
      product: ['', Validators.required],
      nameProduct: ['', Validators.required],
      descProduct: ['', Validators.required],
      valorProduct: ['', Validators.required],
      cateProduct: ['', Validators.required],
      estadoProduct: ['', Validators.required],
      eidproducto: ['eidproducto', Validators.required],
      eproduct: ['', Validators.required],
      enameProduct: ['', Validators.required],
      edescProduct: ['', Validators.required],
      evalorProduct: ['', Validators.required],
      ecateProduct: ['', Validators.required],
      eestadoProduct: ['', Validators.required]

    });
  }
  get f() { return this.angForm.controls; }
  sendLogin(): void {
    this.router.navigate(["login"]);
  }
  procesarResponse(pValue: ProductoRsType) {

    console.log('procesarResponse procesarResponse');
    console.log(pValue);
    this.productoRsType = pValue;
    console.log(pValue.productos);
    this.tablaProductos.push(...pValue.productos);
    console.log("size: " + this.tablaProductos.length);
    console.log("0: " + this.tablaProductos[0].nombre);
  }
  editarProducto(): void { 
    let producto: Producto = {};
      producto.idProducto =   this.angForm.controls.eidproducto.value;
      producto.nombre =       this.angForm.controls.enameProduct.value;
      producto.descripcion =  this.angForm.controls.edescProduct.value;
      producto.valorBase =    this.angForm.controls.evalorProduct.value;
      producto.idCategoria =  this.angForm.controls.ecateProduct.value ;
      producto.estado =       this.angForm.controls.eestadoProduct.value;
      console.log(producto);
      this.productoApi.actualizarProductoPorId('1', '1',producto.idProducto, producto).subscribe(
        value => setTimeout(() => {
          const prd = value;
          this.consultaEspecifica(producto.idProducto);
          this.mostrarNotificacion('Actualización de Producto','se actualizo con exito','success');
        }, 200),
        error => {
          this.mostrarNotificacion('Actualización de Producto','se presento un error, por favor notifique al administrador','danger');
          console.error(JSON.stringify(error))
        },
        () => console.log('done')
      );
      this.renderCrear= false;
      this.renderConsulta = true; 
      this.renderEditar = false; 
        
  }
  renderCrearDiv() : void{
    this.renderCrear= true;
    this.renderConsulta = false; 
    this.renderEditar = false; 
  }
  /**
   * Evento cuando se da click en crear este debe ir y crearlo en base de datos 
   */
  crearProducto(): void {

    let producto: Producto = {};

    producto.nombre = this.angForm.controls.nameProduct.value;
    producto.descripcion = this.angForm.controls.descProduct.value;
    producto.valorBase = this.angForm.controls.valorProduct.value;
    producto.idCategoria = this.angForm.controls.cateProduct.value ;
    producto.estado = this.angForm.controls.estadoProduct.value;
    console.log(producto);
    this.productoApi.registrarProducto('1', '1', producto).subscribe(
      value => setTimeout(() => {
        const prd = value;
        this.consultaEspecifica(value.productos[0].idProducto);
        this.mostrarNotificacion('Creación de Producto','Producto creado con exito','success');
      }, 200),
      error =>{
        this.mostrarNotificacion('Creación de Producto','se presento un error, por favor notifique al administrador','danger');
        console.error(JSON.stringify(error))
      } ,
      () => console.log('done')
    );
    this.renderCrear= false;
    this.renderConsulta = true; 
    this.renderEditar = false; 
  }

  consultarCategoria(idCategoria : number): String {
    console.log(idCategoria);
    return this.categorias[idCategoria].viewValue;
  }

  /**evento de boton cuando se selecciona el editar */
  editar(productoz:ProductosInner): void {
    console.log("prd: "+productoz.idcategoria); 
    this.angForm.controls.eidproducto.setValue(productoz.idProducto);
    this.angForm.controls.enameProduct.setValue(productoz.nombre);
    this.angForm.controls.edescProduct.setValue(productoz.descripcion);
    this.angForm.controls.evalorProduct.setValue(productoz.valorBase);
    
    this.angForm.controls.ecateProduct.setValue(productoz.idcategoria);
    this.angForm.controls.eestadoProduct.setValue(productoz.estado);
     
    this.renderCrear = false ; 
    this.renderConsulta =  false;
    this.renderEditar =  true;
  }
 

 



  /**
   * Consulta especifica por item 
   * @param productoId consultaEspecifica
   */
  consultaEspecifica(productoId: number): void {
    this.tablaProductos = [];
    this.productoApi.conultarProductoPorId('1', '1', productoId).subscribe(
      value => setTimeout(() => {
        const prd = value;
        this.procesarResponse(value);
      }, 200),
      error => console.error(JSON.stringify(error)),
      () => console.log('done')
    );
  }

  /**
   * consulta generica de evento boton
   */
  onClick(): void {
    this.renderConsulta=true; 
    this.renderCrear = false; 
    this.renderEditar = false; 
    this.tablaProductos = [];
    console.log(this.angForm.controls.product.value);

    if (this.angForm.controls.product.value != '' && this.angForm.controls.product.value != null) {
      this.productoApi.conultarProductoPorId('1', '1', this.angForm.controls.product.value).subscribe(
        value => setTimeout(() => {
          const prd = value;
          this.procesarResponse(value);
        }, 200),
        error => console.error(JSON.stringify(error)),
        () => console.log('done')
      );

    } else {
      this.productoApi.conultarProductoPorDescripcion('1', '1', '%').subscribe(
        value => setTimeout(() => {
          const prd = value;
          this.procesarResponse(value);
        }, 200),
        error => console.error(JSON.stringify(error)),
        () => console.log('done')
      );
    }
  }

  ngOnInit() {

    if (this.auth.isLoggedIn == false) {
      this.sendLogin();
    }
    this.createForm();
  }

  mostrarNotificacion(pTitulo : String , pTexto : String, pTipo: String ){

 
    // const type = ['','info','success','warning','danger'];

    const color = Math.floor((Math.random() * 4) + 1);

    $.notify({
        icon: "notifications",
        message: "Welcome to <b>Material Dashboard</b> - a beautiful freebie for every web developer."

    },{
        type: pTipo,
        timer: 2000,
        placement: {
            from: 'bottom',
            align: 'center'
        },
        template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
          '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
          '<i class="material-icons" data-notify="icon">notifications</i> ' +
          '<span data-notify="title">'+pTitulo+'</span> ' +
          '<span data-notify="message">'+pTexto+'</span>' +
        '</div>'
    });
}

}
