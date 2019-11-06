import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Campana, CampanaService} from 'app/_restCampanas';
import { AuthService } from '../auth.service';
import { Router} from '@angular/router';
import { ProductosInner, ProductoService, ProductoRsType } from "../_restProducto";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { DialogOverviewExampleDialog} from 'app/productos/productos.component';

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
  uploadedFiles: Array<File>;
  idProdducto;
  imagenModal: string = "";
  folderImagen: string = "http://localhost:8080";

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private campanaApi: CampanaService,
    private productoApi: ProductoService,
    private http: HttpClient,
    public dialog: MatDialog,
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
      busquedaC: ['', Validators.required],
      itemBusqueda: ['', Validators.required],
      product: ['', Validators.required],
      pNombreProd: ['', Validators.required],
      cDescripcion: ['', Validators.required],
      cFechaInicio: ['', Validators.required],
      cFechaFin: ['', Validators.required],
      cEstado: ['',Validators.required],
      cId: ['',Validators.required],
    });
  }

  mostrarPanelConsulta():void {
    this.panelFiltroCampanas = true;
    this.panelListaCampanas = false;
    this.panelCrearCampanas = false;
  }

  mostrarPanelCrear(){
    this.panelFiltroCampanas = false;
    this.panelListaCampanas = false;
    this.panelCrearCampanas = true;
    this.listaCampanas = [];
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

  PanelProductos(){
    var tipoBusqueda = this.angForm.controls.busquedaC.value;
    var itemBusqueda = this.angForm.controls.product.value;

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
      this.productoApi.conultarProductoPorNombre('1', '1', itemBusqueda).subscribe(
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
      this.productoApi.conultarProductoPorDescripcion('1', '1', itemBusqueda).subscribe(
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
    this.http.post('http://localhost:3000/api/upload', formData, {
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
    this.campanaApi.campanaIdCampanaGet(this.angForm.controls.cId.value).subscribe(
      value => setTimeout(() => {
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
}

