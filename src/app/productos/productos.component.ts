import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductosInner, Producto, ProductoService, ProductoRsType } from "../_restProducto";
import { CategoriaService, CategoriaRsType, } from "../_restCategoria";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';

export interface DialogData {
  imagen: string;
  nombre: string;
}
export interface Estados {
  value: string;
  viewValue: string;
}
export interface Categorias {
  value: number;
  viewValue: string;
}


declare var $: any;


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {
  uploadedFiles: Array<File>;


  estados: Estados[] = [
    { value: 'ACTIVO', viewValue: 'ACTIVO' },
    { value: 'INACTIVO', viewValue: 'INACTIVO' }
  ];

  categoriasMap: Map<number, String>;
  categoriasArray: Categorias[] = [
  ];

  imagenModal: string = "";
  // folderImagen: string = "c:/uploads";
  folderImagen: string = "http://localhost:8080";
  renderCrear: boolean = false;
  renderConsulta: boolean = false;
  renderEditar: boolean = false;


  loading = false;
  submitted = false;
  angForm: FormGroup;
  angForm1: FormGroup;
  productoRsType: ProductoRsType;
  tablaProductos: ProductosInner[] = [];

  constructor(

    public dialog: MatDialog,
    private http: HttpClient,
    private auth: AuthService,
    private router: Router,
    private productoApi: ProductoService,
    private categoriaApi: CategoriaService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,

  ) { }

  createForm() {
    this.angForm = this.formBuilder.group({
      busquedaC: ['', Validators.required],
      product: ['', Validators.required],
      nameProduct: ['', Validators.required],
      descProduct: ['', Validators.required],
      valorProduct: ['', Validators.required],
      cateProduct: ['', Validators.required],
      estadoProduct: ['', Validators.required],
      eidproducto: ['eidproducto', Validators.required],
      eproduct: ['', Validators.required],
      enameProduct: ['', Validators.required],
      edescProduct: ['', Validators.required],
      evalorProduct: ['', Validators.required],
      ecateProduct: ['', Validators.required],
      eestadoProduct: ['', Validators.required]

    });
  }
  get f() { return this.angForm.controls; }
  sendLogin(): void {
    this.router.navigate(["login"]);
  }
  procesarResponse(pValue: ProductoRsType) {
    this.renderConsulta = true;
    if (pValue != null && pValue.productos[0] != null) {
      this.productoRsType = pValue;
      this.tablaProductos.push(...pValue.productos);
    }

  }
  obtenerExtension(pNombreArchivo: string): string {
    var tmp = pNombreArchivo.split('.');
    return tmp[1];
  }
  editarProducto(): void {
    let producto: Producto = {};
    producto.idProducto = this.angForm.controls.eidproducto.value;
    producto.nombre = this.angForm.controls.enameProduct.value;
    producto.descripcion = this.angForm.controls.edescProduct.value;
    producto.valorBase = this.angForm.controls.evalorProduct.value;
    producto.idCategoria = this.angForm.controls.ecateProduct.value;
    producto.estado = this.angForm.controls.eestadoProduct.value;
    var nombArchivo = this.upload(producto.idProducto + "." + this.obtenerExtension(this.uploadedFiles[0].name));
    producto.rutaImagen = nombArchivo;
    console.log(producto);
    this.productoApi.actualizarProductoPorId('1', '1', producto.idProducto, producto).subscribe(
      value => setTimeout(() => {

        this.consultaEspecifica(producto.idProducto);
        this.mostrarNotificacion('Actualización de Producto', 'se actualizo con exito', 'success');
      }, 200),
      error => {
        this.mostrarNotificacion('Actualización de Producto', 'se presento un error, por favor notifique al administrador', 'danger');
        console.error(JSON.stringify(error))
      },
      () => console.log('done')
    );
    this.renderCrear = false;
    this.renderConsulta = true;
    this.renderEditar = false;

  }
  renderCrearDiv(): void {
    this.renderCrear = true;
    this.renderConsulta = false;
    this.renderEditar = false;
  }

  /**
   * actualizar componente
   */

  actualizarProducto(pProducto: Producto) {
    this.productoApi.actualizarProductoPorId('1', '1', pProducto.idProducto, pProducto).subscribe(
      value2 => setTimeout(() => {
        this.consultaEspecifica(pProducto.idProducto);
        this.mostrarNotificacion('Creación de Producto', 'Producto creado con exito', 'success');
      }, 200),
      error => {
        this.mostrarNotificacion('Actualización de Producto', 'se presento un error, por favor notifique al administrador', 'danger');
        console.error(JSON.stringify(error))
      },
      () => console.log('done')
    );
  }
  /**
   * Evento cuando se da click en crear este debe ir y crearlo en base de datos 
   */
  crearProducto(): void {

    let producto: Producto = {};

    producto.nombre = this.angForm.controls.nameProduct.value;
    producto.descripcion = this.angForm.controls.descProduct.value;
    producto.valorBase = this.angForm.controls.valorProduct.value;
    producto.idCategoria = this.angForm.controls.cateProduct.value;
    producto.estado = this.angForm.controls.estadoProduct.value;

    this.productoApi.registrarProducto('1', '1', producto).subscribe(
      value => setTimeout(() => {
        var nombArchivo = this.upload(value.productos[0].idProducto
          + "." + this.obtenerExtension(this.uploadedFiles[0].name));
        producto.rutaImagen = nombArchivo;
        producto.idProducto = value.productos[0].idProducto;
        this.actualizarProducto(producto);
      }, 200),
      error => {
        this.mostrarNotificacion('Creación de Producto', 'se presento un error, por favor notifique al administrador', 'danger');
        console.error(JSON.stringify(error))
      },
      () => console.log('done')
    );
    this.renderCrear = false;
    this.renderConsulta = true;
    this.renderEditar = false;
  }

  consultarCategoria(idCategoria: number): String {

    return this.categoriasMap.get(idCategoria);
  }

  /**evento de boton cuando se selecciona el editar */
  editar(productoz: ProductosInner): void {
    console.log("prd: " + productoz.idcategoria);
    this.angForm.controls.eidproducto.setValue(productoz.idProducto);
    this.angForm.controls.enameProduct.setValue(productoz.nombre);
    this.angForm.controls.edescProduct.setValue(productoz.descripcion);
    this.angForm.controls.evalorProduct.setValue(productoz.valorBase);
    this.angForm.controls.ecateProduct.setValue(productoz.idcategoria);
    this.angForm.controls.eestadoProduct.setValue(productoz.estado);

    this.renderCrear = false;
    this.renderConsulta = false;
    this.renderEditar = true;
  }


  /**
   * Consulta especifica por item 
   * @param productoId consultaEspecifica
   */
  consultaEspecifica(productoId: number): void {
    this.tablaProductos = [];
    this.productoApi.conultarProductoPorId('1', '1', productoId).subscribe(
      value => setTimeout(() => {
        const prd = value;
        this.procesarResponse(value);
      }, 200),
      error => {
        this.mostrarNotificacion('consulta Especifica', 'Se genero un error interno', 'danger');
        console.error(JSON.stringify(error))
      },
      () => console.log('done')
    );
  }

  /**
   * consulta generica de evento boton
   */
  onClick(): void {
    this.renderConsulta = false;
    this.renderCrear = false;
    this.renderEditar = false;
    this.tablaProductos = [];

    var itemBusqueda = this.angForm.controls.product.value;
    var tipoBusqueda = this.angForm.controls.busquedaC.value;

    if (itemBusqueda != '' && itemBusqueda != null) {

      console.log('como buscar:' + tipoBusqueda);
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
      } else {
        this.mostrarNotificacion('consulta', 'Seleccione un concepto de busqueda', 'warning');
      }
    } else {
      this.mostrarNotificacion('consulta', 'Ingrese un concepto de busqueda', 'warning');
    }
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



  verImagen(rutaImagen: string) {
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


  procesarResponseCategoria(value: CategoriaRsType) {

    this.categoriasArray = [];

    for (let i = 0; i < value.categoria.length; i++) {
      let cat: Categorias = {} as any;;
      cat.value = value.categoria[i].idCategoria;
      cat.viewValue = value.categoria[i].nombreCategoria;
      this.categoriasArray.push(cat);
      this.categoriasMap.set(value.categoria[i].idCategoria, value.categoria[i].nombreCategoria);
    }
  }
  ngOnInit() {

    if (this.auth.isLoggedIn == false) {
      this.sendLogin();
    }
    this.createForm();
    this.cargarCategoria();
  }
  cargarCategoria() {
    this.categoriasMap = new Map<number, String>();
    this.categoriaApi.consultarCategoria('1', '1').subscribe(
      value => setTimeout(() => {
        const prd = value;
        this.procesarResponseCategoria(value);
      }, 200),
      error => {
        this.mostrarNotificacion('consultaCategoria', 'Se genero un error interno', 'danger');
        console.error(JSON.stringify(error));
      },
      () => console.log('done')
    );
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

@Component({
  templateUrl: 'imagen.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    public sanitizer: DomSanitizer,
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}