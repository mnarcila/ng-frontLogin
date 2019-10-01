import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductosInner, Producto, ProductoService, ProductoRsType, StatusType } from "../_restProducto";
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {

  title = 'OMS-kallsonys';
  loading = false;
  submitted = false;
  angForm: FormGroup;
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
      product: ['', Validators.required]

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
    // this.tablaProductos =;

  }
  onClick(): void {
    this.tablaProductos = [];
    console.log(this.angForm.controls.product.value);
    this.productoApi.conultarProductoPorId('1', '1', this.angForm.controls.product.value).subscribe(
      value => setTimeout(() => {
        const prd = value;
        this.procesarResponse(value);
      }, 200),
      error => console.error(JSON.stringify(error)),
      () => console.log('done')
    );
  }

  ngOnInit() {

    if (this.auth.isLoggedIn == false) {
      this.sendLogin();
    }
    this.createForm();
  }

}
