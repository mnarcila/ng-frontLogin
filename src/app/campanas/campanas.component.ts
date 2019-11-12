import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Campana, CampanaService} from 'app/_restCampanas';
import { AuthService } from '../auth.service';
import { Router} from '@angular/router';
import { ProductosInner, ProductoService, ProductoRsType } from "../_restProducto";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { DialogOverviewExampleDialog} from 'app/productos/productos.component';
import { RolesService, Roles } from 'app/_restRoles';

export interface Estados {
  value: string;
  viewValue: string;
}

export interface DialogData {
  imagen: string;
  nombre: string;
}


declare var $: any;

@Component({
  selector: 'app-campanas',
  templateUrl: './campanas.component.html',
  styleUrls: ['./campanas.component.scss']
})
export class CampanasComponent implements OnInit {

  estados: Estados[] = [
    { value: 'ACTIVO', viewValue: 'ACTIVO' },
    { value: 'INACTIVO', viewValue: 'INACTIVO' }
  ];

  angForm: FormGroup;
  panelFiltroCampanas = false;
  panelListaCampanas = false;
  panelCrearCampanas = false;
  listaCampanas: Campana[] = [];
  panelMostrarProducto = false;
  panelTablaProductos = false;
  productoRsType: ProductoRsType;
  tablaProductos: ProductosInner[] = [];
  producto : ProductosInner ; 
  uploadedFiles: Array<File>;
  idProdducto;
  imagenModal: string = "";
  folderImagen: string = "http://10.39.1.149:8080";
  panelActualizaCampanas = false;
  campana: Campana = {};
  listaRoles: Roles[];

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private campanaApi: CampanaService,
    private productoApi: ProductoService,
    private http: HttpClient,
    public dialog: MatDialog,
    private rolesServices: RolesService,
  ) {}

  

   ngOnInit() {
    this.permisosRoles();
    this.producto =   {};
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
      busquedaC: ['', Validators.required],
      itemBusqueda: ['', Validators.required],
      product: ['', Validators.required],
      pNombreProd: ['', Validators.required],
      cDescripcion: ['', Validators.required],
      cFechaInicio: ['', Validators.required],
      cFechaFin: ['', Validators.required],
      cEstado: ['',Validators.required],
      cId: ['',Validators.required],
      ecEstado: ['',Validators.required],
      epProd: ['',Validators.required],
      ecFechaFin: ['',Validators.required],
      ecFechaInicio: ['',Validators.required],
      ecDescripcion: ['',Validators.required],
      ecIdCampana: ['',Validators.required],
    });
  }

  mostrarPanelConsulta():void {
    if (this.validarPermisos(3)){
      this.panelFiltroCampanas = true;
      this.panelListaCampanas = false;
      this.panelCrearCampanas = false;
    }else{
      this.mostrarNotificacion('Acceso denegado', 'No tiene permiso para esta función', 'danger');
    }
  }

  mostrarPanelCrear(){
    if(this.validarPermisos(3)){
      this.panelFiltroCampanas = false;
      this.panelListaCampanas = false;
      this.panelCrearCampanas = true;
      this.listaCampanas = [];
      this.panelActualizaCampanas = false;
    }else{
      this.mostrarNotificacion('Acceso denegado', 'No tiene permiso para esta función', 'danger');
    }
  }

  mostrarPanelProducto(){
    this.panelMostrarProducto = true;
    this.panelFiltroCampanas = false;
    this.panelListaCampanas = false;
  }

  procesarResponse(pValue: ProductoRsType) {
    //this.renderConsulta = true;
    if (pValue != null && pValue.productos[0] != null) {
      this.productoRsType = pValue;
      this.tablaProductos.push(...pValue.productos);
    }

  }

  panelProductos(){
    var tipoBusqueda = this.angForm.controls.busquedaC.value;
    var itemBusqueda = this.angForm.controls.product.value;
    this.busquedaProducto(tipoBusqueda,itemBusqueda);
  }

  busquedaProducto(tipoBusqueda:number, itemBusqueda:number){

    if (tipoBusqueda == 1) {
      this.productoApi.conultarProductoPorId('1', '1', itemBusqueda).subscribe(
        value => setTimeout(() => {
          const prd = value;
          this.procesarResponse(value);
        }, 200),
        error => {
          this.mostrarNotificacion('consulta', 'Se genero un error interno', 'danger');
          console.error(JSON.stringify(error));
        },
        () => console.log('done')
      );
    }
    else if (tipoBusqueda == 2) {
      this.productoApi.conultarProductoPorNombre('1', '1', itemBusqueda+"").subscribe(
        value => setTimeout(() => {
          const prd = value;
          this.procesarResponse(value);
        }, 200),
        error => {
          this.mostrarNotificacion('consulta', 'Se genero un error interno', 'danger');
          console.error(JSON.stringify(error));
        }
        ,
        () => console.log('done')
      );
    }
    else if (tipoBusqueda == 3) {
      this.productoApi.conultarProductoPorDescripcion('1', '1', itemBusqueda+"").subscribe(
        value => setTimeout(() => {
          const prd = value;
          this.procesarResponse(value);
        }, 200),
        error => {
          this.mostrarNotificacion('consulta', 'Se genero un error interno', 'danger');
          console.error(JSON.stringify(error));
        },
        () => console.log('done')
      );
    }
    else if (tipoBusqueda == 4) {
      this.productoApi.conultarProductoPorId('1', '1', itemBusqueda).subscribe(
        value => setTimeout(() => {
          this.producto = value.productos[0];
        }, 200),
        error => {
          this.mostrarNotificacion('consulta', 'Se genero un error interno', 'danger');
          console.error(JSON.stringify(error));
        },
        () => console.log('done')
      );
    } 
    this.panelTablaProductos = true;

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

  seleccionarProducto(productoz: ProductosInner){
    this.angForm.controls.pNombreProd.setValue(productoz.nombre);
    this.idProdducto = productoz.idProducto;
    this.panelTablaProductos = false;
    this.tablaProductos = [];
    this.panelMostrarProducto = false;
    

  }

  fileChange(element) {
    this.uploadedFiles = element.target.files;
  }

  upload(filename: string): string {
    let formData = new FormData();
    let varName = filename;
    for (var i = 0; i < this.uploadedFiles.length; i++) {
      formData.append("uploads[]", this.uploadedFiles[i], filename);
      varName = filename
    }
    var headers = new HttpHeaders();
    this.http.post('http://10.39.1.151:3000/api/upload', formData, {
      headers: headers
    })
      .subscribe((response) => {
        console.log('response received is ', response);
      });

    return varName;
  }

  obtenerExtension(pNombreArchivo: string): string {
    var tmp = pNombreArchivo.split('.');
    return tmp[1];
  }

  CrearCampana(){
    let campana:Campana = {};
    
    campana.fechaInicio = this.angForm.controls.cFechaFin.value;
    campana.fechaFin = this.angForm.controls.cFechaFin.value;
    campana.descripcion = this.angForm.controls.cDescripcion.value;
    campana.fechaCreacion = new Date();
    campana.usuarioCreador = 'ADMIN';
    campana.idProducto = this.idProdducto;
    campana.rutaBanner = '';
    campana.estado = this.angForm.controls.cEstado.value;

    this.campanaApi.campanaPost(campana).subscribe(
      value => setTimeout(() => {
        var nombArchivo = this.upload("CPN_"+value.idCamapana
          + "." + this.obtenerExtension(this.uploadedFiles[0].name));
        campana.idCamapana = value.idCamapana;
        campana.rutaBanner = nombArchivo;
        this.actualizarCampana(campana);
        this.angForm.controls.cId.setValue(value.idCamapana);
        this.buscarCampanaID();
        this.panelCrearCampanas = false;
        this.mostrarNotificacion('Creación de Campaña', 'Se ha creado la campañan exitosamente', 'success');
      }, 200),
      error => {
        this.mostrarNotificacion('Creación de Producto', 'se presento un error, por favor notifique al administrador', 'danger');
        console.error(JSON.stringify(error))
      },
      () => console.log('done')
    );
    
  }

  actualizarCampana(campana: Campana) {
    this.campanaApi.campanaIdCampanaPut(campana, campana.idCamapana).subscribe(
      value2 => setTimeout(() => {
        //this.consultaEspecifica(pProducto.idProducto);
        this.mostrarNotificacion('Actualización de Campaña', 'Campaña actualizada con exito', 'success');
      }, 200),
      error => {
        this.mostrarNotificacion('Actualización de Campaña', 'se presento un error, por favor notifique al administrador', 'danger');
        console.error(JSON.stringify(error))
      },
      () => console.log('done')
    );
  }

  buscarCampanaID(){
    this.listaCampanas = [];
    this.campanaApi.campanaIdCampanaGet(this.angForm.controls.cId.value).subscribe(
      value => setTimeout(() => {
        this.busquedaProducto(4,value.idProducto);
        this.panelTablaProductos = false;
        console.log(this.panelTablaProductos);
        this.listaCampanas.push(value);
        this.panelListaCampanas = true;
        this.panelFiltroCampanas = false;
      }, 200),
      error => {
        this.mostrarNotificacion('consulta', 'Se genero un error interno', 'danger');
        console.error(JSON.stringify(error));
      },
      () => console.log('done')
    );
  }

  verImagen(rutaImagen: string) {
    console.log('imagen ' + rutaImagen );
    this.imagenModal = this.folderImagen + "/" + rutaImagen;

    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '350px',
      data: {
        'imagen': this.imagenModal,
        'archivo': rutaImagen
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });

  }

  mostrarPanelActualizar(cam: Campana){
    if(this.validarPermisos(3)){
      this.angForm.controls.ecIdCampana.setValue(cam.idCamapana);
      this.angForm.controls.ecDescripcion.setValue(cam.descripcion);
      let fecInicio:string;
      fecInicio = cam.fechaInicio+"";
      this.angForm.controls.ecFechaInicio.setValue(fecInicio.substr(0,10));
      let fecFin: string;
      fecFin = cam.fechaFin+"";
      this.angForm.controls.ecFechaFin.setValue(fecFin.substr(0,10));
      this.angForm.controls.epProd.setValue(this.producto.nombre);
      this.angForm.controls.ecEstado.setValue(cam.estado);
      this.campana = cam;
      this.panelActualizaCampanas = true;
    }else{
      this.mostrarNotificacion('Acceso denegado', 'No tiene permiso para esta función', 'danger');
    }
  } 

  updateCampana(){
    let cam: Campana = this.campana;
    cam.descripcion =  this.angForm.controls.ecDescripcion.value;
    cam.fechaInicio =  this.angForm.controls.ecFechaInicio.value;
    cam.fechaFin =  this.angForm.controls.ecFechaFin.value;
    cam.idProducto = this.producto.idProducto;
    cam.estado = this.angForm.controls.ecEstado.value;
    this.actualizarCampana(cam);
    this.panelActualizaCampanas = false;
  }

  permisosRoles() {
    this.rolesServices.consultarPermisosRol('1', '1', this.auth.getLoggedName()).subscribe(
      value => setTimeout(() => {
        var roles = value.datosBasicos;
        this.listaRoles = roles;
        console.log("permisos "+ this.listaRoles);
      }, 200),
      error => {
      },
      () => console.log('done')
    );
    //return false;
  }

  validarPermisos(id:number ):boolean {
    let per: number;
        for (let index = 0; index < this.listaRoles.length; index++) {
          per = this.listaRoles[index].idrol;
          console.log("permisos " + per);
          if(per == id){
            console.log('son iguales ');
            return true;
          }
        }
        return false;
  }
}

