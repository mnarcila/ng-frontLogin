import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Campana, CampanaService} from 'app/_restCampanas';
import { AuthService } from '../auth.service';
import { Router} from '@angular/router';


@Component({
  selector: 'app-campanas',
  templateUrl: './campanas.component.html',
  styleUrls: ['./campanas.component.scss']
})
export class CampanasComponent implements OnInit {

  angForm: FormGroup;
  panelFiltroCampanas = false;
  panelListaCampanas = false;
  panelCrearCampanas = false;
  listaCampanas: Campana[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private campanaApi: CampanaService,
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
      
    });
  }

  mostrarPanelConsulta():void {
    this.panelFiltroCampanas = true;
    this.panelListaCampanas = false;
    //this.panelEditarEmpleado = false;
    this.panelCrearCampanas = false;
  }

  mostrarPanelCrear(){
    this.panelFiltroCampanas = false;
    this.panelListaCampanas = false;
    //this.panelEditarEmpleado = false;
    this.panelCrearCampanas = true;
    this.angForm.controls.uId.setValue('');
    this.listaCampanas = [];
  }
/*
  buscarEmpleadoID():void{
    this.listaCampanas = [];
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

  editarEmpleado(usu: Empleado):void {
    this.panelEditarEmpleado = true;
    this.angForm.controls.uId.setValue(usu.idEmpleado);
    this.angForm.controls.uNombre.setValue(usu.nombre);
    this.angForm.controls.uApellido.setValue(usu.apellido);
    this.angForm.controls.uUsuario.setValue(usu.usuario);
    this.angForm.controls.uClave.setValue(usu.clave);
    this.angForm.controls.uEstado.setValue(usu.estado);
  }

  ActualizarEmpleado(usuario:Empleado ){
    //let empl :Empleado = {};
    //empl.idEmpleado = this.angForm.controls.uId.value;
    //empl.nombre = this.angForm.controls.uNombre.value;
    //empl.apellido = this.angForm.controls.uApellido.value;
    //empl.usuario = this.angForm.controls.uUsuario.value;
    //empl.estado = this.angForm.controls.uEstado.value;
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
    //empl.idEmpleado = this.angForm.controls.uId.value;
    empl.nombre = this.angForm.controls.uNombre.value;
    empl.apellido = this.angForm.controls.uApellido.value;
    empl.usuario = this.angForm.controls.uUsuario.value;
    empl.clave = this.angForm.controls.uClave.value;
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
*/
}
