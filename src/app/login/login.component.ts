import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Empleado, EmpleadoService, AutenticarRsType, StatusType } from '../_restLogin';
import { HttpParameterCodec } from "@angular/common/http";
import { AuthService } from '../auth.service';
import { sha256, sha224 } from 'js-sha256';

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
    console.log(pValue);
    if (pValue.autenticacion) {
      this.auth.setLoggedIn(true);
      this.auth.setLoggedName(this.angForm.controls.username.value)
      console.log("mensaje de session:"+this.auth.getLoggedName());
      this.router.navigate(["home"]);
    } else {
      this.auth.setLoggedIn(false);
    }
  }
  procesarResponse(pValue: AutenticarRsType) {
    console.log('procesarResponse procesarResponse');
    this.autenticarRsType = pValue;
    this.validarAutenticacion(pValue);
  }

  onClick(): void {
    let pass = sha256(this.angForm.controls.password.value);
    //console.log(pass);
    this.empleadoApi.autenticarEmpleado('1', '1', this.angForm.controls.username.value, pass).subscribe(
      value => {
        this.procesarResponse(value);
      },
      error => console.error(JSON.stringify(error)),
      () => console.log('done')
    );
    //this.auth.setLoggedIn(true);
    //this.router.navigate(["home"]);
    //console.log('usuario Invalido '+this.auth.getLoggedName);

  }


}




