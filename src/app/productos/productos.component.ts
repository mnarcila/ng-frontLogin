import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductosInner, Producto, ProductoService, ProductoRsType, StatusType } from "../_restProducto";
import { Router, ActivatedRoute } from '@angular/router';

export interface Estados {
  value: string;
  viewValue: string;
}

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
  renderCrear: boolean = false;
  renderConsulta: boolean = false;

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
      estadoProduct: ['', Validators.required]
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

  crearProducto(): void {

    let producto: Producto = {};

    producto.nombre = this.angForm.controls.nameProduct.value;
    producto.descripcion = this.angForm.controls.descProduct.value;
    producto.valorBase = this.angForm.controls.valorProduct.value;
    producto.idCategoria = 1; // this.angForm.controls.cateProduct.value ;
    producto.estado = this.angForm.controls.estadoProduct.value;
    console.log(producto);
    this.productoApi.registrarProducto('1', '1', producto).subscribe(
      value => setTimeout(() => {
        const prd = value;
        this.consultaEspecifica(value.productos[0].idProducto);
      }, 200),
      error => console.error(JSON.stringify(error)),
      () => console.log('done')
    );
    this.renderCrear= false;
    this.renderConsulta = true; 
  }

  renderCrearDiv(): void {
    if (this.renderCrear) {
      this.renderCrear = false;
    } else {
      this.renderCrear = true;
    }
    this.renderConsulta= false;
  }

  renderConsultar(): void {
    if (this.renderConsulta) {
      this.renderConsulta = false;
    } else {
      this.renderConsulta = true;
    }

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

}
