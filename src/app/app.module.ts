import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core'; 
import { RouterModule } from '@angular/router';
import {MatRadioModule} from '@angular/material/radio';
import { AppRoutingModule } from './app.routing';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
 
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
 
//componentes de pantalla 
import { ComponentsModule } from './components/components.module';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';

//componentes para consumo de webService
import { HttpModule,Http } from '@angular/http';
import { HttpClientModule ,HttpHeaders} from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Empleado, EmpleadoService, AutenticarRsType } from './_restLogin';
import { Producto, ProductoService, ProductoRsType } from './_restProducto';
import { Cliente, ClienteService, ClientesRsType } from './_restClientes';
import { ReqCategoria, CategoriaService, CategoriaRsType } from './_restCategoria';
import { BrowserModule } from '@angular/platform-browser';
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
import { ProductosComponent } from './productos/productos.component';
import { ClientesComponent } from './clientes/clientes.component';


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
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    })
  ],
  declarations: [
    //componentes que se utilizaran para la navegacion 
    AppComponent,
    AdminLayoutComponent,
    LoginComponent, 
    DashboardComponent,
    UserProfileComponent, 
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    ProductosComponent,
    ClientesComponent,

  ],
  providers: [
    AuthService,
    FormBuilder,
    EmpleadoService,
    ProductoService,
    ClienteService,
    CategoriaService,
    Http,
    HttpModule,
    HttpClientModule

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
