import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule ,HttpHeaders} from '@angular/common/http';
import { Http, HttpModule ,} from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent} from './login/login.component';
import { MasterComponent } from './master/master.component';
import { HomeComponent } from './home/home.component'
import {Empleado,  EmpleadoService, AutenticarRsType } from './rest'
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MasterComponent,
    HomeComponent
  ],
  imports: [
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    BrowserModule,
    
    AppRoutingModule
  ],
  providers: [
    FormBuilder,
    EmpleadoService,
    Http,
    HttpModule,
    HttpClientModule
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
