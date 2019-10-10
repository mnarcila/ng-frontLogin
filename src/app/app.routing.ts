import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ProductosComponent } from "./productos/productos.component";
//items del menu
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
 
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import {ClientesComponent} from './clientes/clientes.component';
const menuRoutes: Routes = [

  { path: 'dashboard', component: DashboardComponent },
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'productos', component: ProductosComponent },
  { path: 'clientes', component: ClientesComponent },
  { path: 'typography', component: TypographyComponent },
  { path: 'icons', component: IconsComponent },
  { path: 'maps', component: MapsComponent },
  { path: 'notifications', component: NotificationsComponent },
];
const childrenRoutes: Routes = [
  { path: 'home', component: AdminLayoutComponent, children: menuRoutes },
  { path: '**', redirectTo: 'home' },
];
const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'home', children: childrenRoutes },
  { path: '**', redirectTo: 'login' },

  { path: 'dashboard', component: DashboardComponent },
  { path: 'user-profile', component: UserProfileComponent },

  { path: 'productos', component: ProductosComponent },
  { path: 'clientes', component: ClientesComponent },
  
  { path: 'typography', component: TypographyComponent },
  { path: 'icons', component: IconsComponent },
  { path: 'maps', component: MapsComponent },
  { path: 'notifications', component: NotificationsComponent },

];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
