import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Empleado, EmpleadoService, AutenticarRsType, StatusType } from '../_restLogin';
import { HttpParameterCodec } from "@angular/common/http";
import { AuthService } from '../auth.service';
import { sha256, sha224 } from 'js-sha256';
declare var $: any;
@Component({
  selector: 'LoginComponent',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  loading = false;
  submitted = false;

  respuesta: Boolean;
  angForm: FormGroup;
  autenticarRsType: AutenticarRsType;
  constructor(

    private auth: AuthService,
    private empleadoApi: EmpleadoService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {

  }
  createForm() {
    this.angForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  ngOnInit() {
    this.createForm();
  }
  get f() { return this.angForm.controls; }

  registrarEmpleado(): void {


    let empleado: Empleado = {} as any;
    empleado.apellido = 'mag';
    empleado.clave = 'mag';
    empleado.nombre = 'mag';
    empleado.estado = 'ACTIVO';
    empleado.usuario = 'mag';

    this.empleadoApi.registrarEmpleado('1', '1', empleado).subscribe(
      value => {
        console.log('value:' + value.idEmpleadoCreado);
      },
      error => console.error(JSON.stringify(error)),
      () => console.log('done')

    );
  }

  validarAutenticacion(pValue: AutenticarRsType): void {

    if (pValue.autenticacion) {
      this.auth.setLoggedIn(true);
      this.auth.setLoggedName(this.angForm.controls.username.value)
      var ruta = "home/dashboard"
      console.log("ruta::" + ruta)
      this.router.navigate([ruta]);
    } else {
      this.auth.setLoggedIn(false);
      this.mostrarNotificacion('Login', 'Usuario o clave incorrecto', 'warning');
    }
  }
  procesarResponse(pValue: AutenticarRsType) {
    console.log('procesarResponse procesarResponse');
    this.autenticarRsType = pValue;
    this.validarAutenticacion(pValue);
  }

  onClick(): void {
    var pass = sha256(this.angForm.controls.password.value);
    var usuario = this.angForm.controls.username.value;
    if ((pass != '' && pass != null) && (usuario != '' && usuario != null)) {

      //console.log(pass);
      this.empleadoApi.autenticarEmpleado('1', '1', usuario, pass).subscribe(
        value => {
          this.procesarResponse(value);
        },
        error => console.error(JSON.stringify(error)),
        () => console.log('done')
      );

    } else {
      this.mostrarNotificacion('Login', 'Debe ingresar usuario y clave', 'warning');
      this.submitted = true;

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

}




