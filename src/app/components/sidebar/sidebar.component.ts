import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  };
}
