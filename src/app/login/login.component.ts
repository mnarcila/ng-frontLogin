import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Empleado, EmpleadoService, AutenticarRsType, StatusType } from '../_restLogin';
import { HttpParameterCodec } from "@angular/common/http";
import { AuthService } from '../auth.service';
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
      this.router.navigate(["home"]);
      console.log("mensaje de session:"+this.auth.isLoggedIn);
    } else {
      this.auth.setLoggedIn(false);
      console.log('usuario Invalido');
    }
  }
  procesarResponse(pValue: AutenticarRsType) {
    console.log('procesarResponse procesarResponse');
    this.autenticarRsType = pValue;
    this.validarAutenticacion(pValue);
  }

  onClick(): void {

    var usuario = this.angForm.controls.username.value;
    var password = encodeURIComponent(this.angForm.controls.password.value);

    

    this.empleadoApi.autenticarEmpleado('1', '1', usuario,password ).subscribe(
      value => {
        this.procesarResponse(value);
      },
      error => console.error(JSON.stringify(error)),
      () => console.log('done')
    );



  }


}




