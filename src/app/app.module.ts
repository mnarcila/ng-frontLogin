import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatRadioModule } from '@angular/material/radio';
import { AppRoutingModule } from './app.routing';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MatDialogModule } from '@angular/material/dialog';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';

//componentes de pantalla 
import { ComponentsModule } from './components/components.module';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';

//componentes para consumo de webService
import { HttpModule, Http } from '@angular/http';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Empleado, EmpleadoService, AutenticarRsType } from './_restLogin';
import { Producto, ProductoService, ProductoRsType } from './_restProducto';
import { OrdenM, DetalleOrden, OrdenService, DetalleOrdenService, OrdenRsType } from './_restOrdenes';
import { Cliente, ClienteService, ClientesRsType } from './_restClientes';
import { ReqCategoria, CategoriaService, CategoriaRsType } from './_restCategoria';
import { BrowserModule } from '@angular/platform-browser';
import { RolesService} from './_restRoles';
import {ReporteService } from './_restReportes';
//componentes de seguridad 
import { AuthService } from './auth.service'
//componentes visuales
import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule

} from '@angular/material';
import {
  AgmCoreModule
} from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

import { ProductosComponent, DialogOverviewExampleDialog } from './productos/productos.component';

import { OrdenesComponent } from './ordenes/ordenes.component';
import { CampanasComponent } from './campanas/campanas.component';
import { ClientesComponent } from './clientes/clientes.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { CampanaService } from './_restCampanas';
import { ReportesComponent } from './reportes/reportes.component';
import { NgxSpinnerModule } from "ngx-spinner"; 
import {DatePipe} from '@angular/common';
import { tarjetaService } from './_tarjetaCredito/tarjeta.service';
import { envioPagoService } from './_restEnvioPago/envioPago.Service';
import { serviceEstadoProv } from './_estadoProv/serviceEstadoProv';

@NgModule({
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatRadioModule,
    ReactiveFormsModule,
    HttpModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatDialogModule,
    NgxSpinnerModule, 
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    })
  ],
  declarations: [
    //componentes que se utilizaran para la navegacion 
    AppComponent,
    DialogOverviewExampleDialog,
    AdminLayoutComponent,
    LoginComponent,
    DashboardComponent,
    UserProfileComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    OrdenesComponent,
    ProductosComponent,
    ClientesComponent,
    UsuarioComponent,
    CampanasComponent,
    ReportesComponent,
  ],
  providers: [
    serviceEstadoProv,
    envioPagoService,
    tarjetaService,
    AuthService,
    FormBuilder,
    EmpleadoService,
    ProductoService,
    ClienteService,
    CategoriaService,
    Http,
    HttpModule,
    HttpClientModule,
    OrdenService,
    DetalleOrdenService,
    ClienteService,
    CampanaService,
    RolesService,
    ReporteService,
    DatePipe,
  ],
  entryComponents: [DialogOverviewExampleDialog],
  bootstrap: [AppComponent]
})
export class AppModule { }
