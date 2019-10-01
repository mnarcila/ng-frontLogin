import { Component, OnInit } from '@angular/core';
import { Orden } from '../Ordenes/Orden';

@Component({
  selector: 'app-ordenes',
  templateUrl: './ordenes.component.html',
  styleUrls: ['./ordenes.component.scss']
})
export class OrdenesComponent implements OnInit {
  Ordenes:Orden[] = [
    { id:1, nombre:'Susana', direccion :"Mercolan", valorT: "Mujer", cantidad: 10, fechaSol: "2019-09-30", fechaApro: "2019-09-30", fechaCierre: "2019-09-30", estado: "activo"},
    { id:2, nombre:'cesar', direccion :"Mercolan", valorT: "Mujer", cantidad: 10, fechaSol: "2019-09-30", fechaApro: "2019-09-30", fechaCierre: "2019-09-30", estado: "activo"}
];
  constructor() {
   }



  ngOnInit() {
  }

}
