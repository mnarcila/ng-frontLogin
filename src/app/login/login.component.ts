import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Empleado, EmpleadoService, AutenticarRsType, StatusType } from '../rest';

@Component({
  selector: 'LoginComponent',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title = 'OMS-kallsonys';
  loading = false;
  submitted = false;
  returnUrl: string;
  respuesta: Boolean;
  angForm: FormGroup;
  autenticarRsType: AutenticarRsType;
  constructor(

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
      this.router.navigate(["/secure/home"]);
    } else {
      console.log('usuario Invalido');
    }
  }
  procesarResponse(pValue: AutenticarRsType) {
    console.log('procesarResponse procesarResponse');
    this.autenticarRsType = pValue;
    this.validarAutenticacion(pValue);
  }

  onClick(): void {

    this.empleadoApi.autenticarEmpleado('1', '1', this.angForm.controls.username.value, this.angForm.controls.password.value).subscribe(
      value => {
        this.procesarResponse(value);
      },
      error => console.error(JSON.stringify(error)),
      () => console.log('done')
    );
    //setTimeout(() => this.validarAutenticacion(), 200);


  }


}




