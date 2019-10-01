import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Producto, ProductoService, ProductoRsType, StatusType } from "../_restProducto";
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {

  title = 'OMS-kallsonys';
  loading = false;
  submitted = false;
  angForm: FormGroup;
  productoRsType: ProductoRsType;

  sendLogin(): void {
    this.router.navigate(["login"]);
  }
  constructor(
    private auth: AuthService,
    private router: Router,
    private productoApi: ProductoService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
  ) { }

  procesarResponse(pValue: ProductoRsType) {
    console.log('procesarResponse procesarResponse');
    console.log(pValue);
    this.productoRsType = pValue;

  }
  onClick(): void {

    this.productoApi.conultarProductoPorId('1', '1', 1).subscribe(
      value => {
        this.procesarResponse(value);
      },
      error => console.error(JSON.stringify(error)),
      () => console.log('done')
    );
  }
  ngOnInit() {
    console.log("table-list:" + this.auth.isLoggedIn);
    if (this.auth.isLoggedIn == false) {
      this.sendLogin();
    }
  }

}
