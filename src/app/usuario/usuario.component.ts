import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router} from '@angular/router';
import { EmpleadoService, Empleado } from 'app/_restLogin';
import { sha256, sha224 } from 'js-sha256';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {

  angForm: FormGroup;
  panelFiltroEmpleado = false;
  panelListaEmpleado = false;
  //panelEditarEmpleado = false;
  panelCrearEmpleado = false;
  listaEmpleados: Empleado[] = [];
  //listaEstados: Estados[] = new Listas().estados;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private empleadoApi: EmpleadoService,
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
      uId: ['', Validators.required],
      uNombre: ['', Validators.required],
      uApellido: ['', Validators.required],
      uUsuario: ['', Validators.required],
      uClave: ['', Validators.required],
      uEstado: ['', Validators.required],
    });
  }

  mostrarPanelConsulta():void {
    this.panelFiltroEmpleado = true;
    this.panelListaEmpleado = false;
    //this.panelEditarEmpleado = false;
    this.panelCrearEmpleado = false;
  }

  mostrarPanelCrear(){
    this.panelFiltroEmpleado = false;
    this.panelListaEmpleado = false;
    //this.panelEditarEmpleado = false;
    this.panelCrearEmpleado = true;
    this.angForm.controls.uId.setValue('');
    this.listaEmpleados = [];
  }

  buscarEmpleadoID():void{
    this.listaEmpleados = [];
    this.empleadoApi.consultarEmpleadoPorId('1', '1', this.angForm.controls.uId.value).subscribe(
      value => setTimeout(() => {
        console.log(value);
        //deberia settear el onjeto
        this.listaEmpleados.push(value.empleado);
        this.panelListaEmpleado = true;
      }, 200),
      error => console.error(JSON.stringify(error)),
      () => console.log('done')
    );
  }

  /*editarEmpleado(usu: Empleado):void {
    this.panelEditarEmpleado = true;
    this.angForm.controls.uId.setValue(usu.idEmpleado);
    this.angForm.controls.uNombre.setValue(usu.nombre);
    this.angForm.controls.uApellido.setValue(usu.apellido);
    this.angForm.controls.uUsuario.setValue(usu.usuario);
    this.angForm.controls.uClave.setValue(usu.clave);
    this.angForm.controls.uEstado.setValue(usu.estado);
  }*/

  ActualizarEmpleado(usuario:Empleado ){
    this.empleadoApi.actualizarEmpleadoPorId('1', '1', usuario.idEmpleado).subscribe(
      value => setTimeout(() => {
        const prd = value;
        //this.procesarResponseDetalle(value);
        this.angForm.controls.uId.setValue('');
        this.listaEmpleados = [];
      }, 200),
      error => console.error(JSON.stringify(error)),
      () => console.log('done')
    );
    this.panelFiltroEmpleado = false;
    this.panelListaEmpleado = false;
    //this.panelEditarEmpleado = false;
    this.panelCrearEmpleado = false;
  }

  CrearEmpleado(){
    let empl :Empleado = {};
    empl.nombre = this.angForm.controls.uNombre.value;
    empl.apellido = this.angForm.controls.uApellido.value;
    empl.usuario = this.angForm.controls.uUsuario.value;
    empl.clave = sha256(this.angForm.controls.uClave.value);
    empl.estado = this.angForm.controls.uEstado.value;
    this.empleadoApi.registrarEmpleado('1', '1', empl).subscribe(
      value => setTimeout(() => {
        const prd = value;
        //this.procesarResponseDetalle(value);
      }, 200),
      error => console.error(JSON.stringify(error)),
      () => console.log('done')
    );
    this.panelFiltroEmpleado = false;
    this.panelListaEmpleado = false;
    //this.panelEditarEmpleado = false;
    this.panelCrearEmpleado = false;
  }

}
