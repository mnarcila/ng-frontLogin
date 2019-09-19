 
 
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { MasterComponent } from './master/master.component';
import { HomeComponent } from './home/home.component';

const childrenRoutes: Routes = [
  { path: 'home', component: HomeComponent },    
  { path: '**', redirectTo: 'home' }
];

const routes: Routes = [
  { path: 'login', component: LoginComponent },  
  { path: 'secure', component: MasterComponent, children: childrenRoutes },  
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
