import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Orden } from '../ordenes/Orden';
import {OrdenRsType, OrdenService, StatusType,DetalleOrdenService, OrdenM, DetalleOrden} from '../_restOrdenes';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ordenes',
  templateUrl: './ordenes.component.html',
  styleUrls: ['./ordenes.component.scss']
})
export class OrdenesComponent implements OnInit {
  ordenes:Orden[] = [
    { id:1, nombre:'Susana', direccion :"Mercolan", valorT: "Mujer", cantidad: 10, fechaSol: "2019-09-30", fechaApro: "2019-09-30", fechaCierre: "2019-09-30", estado: "activo"},
    { id:2, nombre:'cesar', direccion :"Mercolan", valorT: "Mujer", cantidad: 10, fechaSol: "2019-09-30", fechaApro: "2019-09-30", fechaCierre: "2019-09-30", estado: "activo"}
  ];
  angForm: FormGroup;
  tablaOrdenes: boolean = false;
  listOrdenes: OrdenM[] = [];

  constructor(
    private ordenesApi: OrdenService,
    private auth: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {}



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
      consultaId: ['', Validators.required]
    });
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
  colsultarOrdenXid():void {
    if (this.angForm.controls.consultaId.value != '' && this.angForm.controls.consultaId.value != null) {
      this.tablaOrdenes = true;
      this.ordenesApi.conultarOrdenPorId('1', '1', this.angForm.controls.consultaId.value).subscribe(
        value => setTimeout(() => {
          const prd = value;
          this.procesarResponse(value);
        }, 200),
        error => console.error(JSON.stringify(error)),
        () => console.log('done')
      );
    }
  }
}
