import { Component, OnInit } from '@angular/core';
import { RolesService, Roles, RolRsType } from '../../_restRoles';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: 'dashboard', title: 'Home', icon: 'dashboard', class: '' },
  //{ path: 'table-list', title: 'Productos', icon: 'content_paste', class: '' },
  { path: 'ordenes', title: 'Ordenes', icon: 'library_books', class: '' },
  { path: 'productos', title: 'Productos', icon: 'content_paste', class: '' },
  //{ path: 'typography', title: 'Ordenes', icon: 'library_books', class: '' },
  { path: 'campanas', title: 'Campañas', icon: 'bubble_chart', class: '' },
  { path: 'clientes', title: 'Clientes', icon: 'location_on', class: '' },
  { path: 'reportes', title: 'Reportes', icon: 'insert_drive_file', class: '' },
  { path: 'usuario', title: 'Usuario', icon: 'person', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(
    private auth: AuthService,
    private rolesServices: RolesService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }


  cerrarSesion() {
    //console.log("hola mundo");
    this.auth.setLoggedIn(false);
    this.auth.setLoggedName('')
    //console.log("mensaje de session:"+this.auth.getLoggedName());
    this.router.navigate(["login"]);
  }
  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  };

}
