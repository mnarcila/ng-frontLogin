import { Component, OnInit } from '@angular/core';
import { RolesService, Roles, RolRsType} from '../../_restRoles';
import {AuthService} from '../../auth.service';

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
  { path: 'notifications', title: 'Reportes', icon: 'notifications', class: '' },
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
  ) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  };

  permisosRoles(titulo:string){
    console.log("entre al metodo "+ titulo);
    this.rolesServices.consultarPermisosRol('1', '1', this.auth.getLoggedName()).subscribe(
      value => setTimeout(() => {
        var roles = value.datosBasicos;
        let per: number[];
        for (let index = 0; index < roles.length; index++) {
          per.push(roles[index].idpantallarol);
        }
        console.log("permisos "+per);
      }, 200),
      error => {
        //this.mostrarNotificacion('Consulta Dirección', 'Se presento un error, por favor notifique al administrador', 'danger');
        //console.error(JSON.stringify(error))
      },
      () => console.log('done')
    );
  }
}
