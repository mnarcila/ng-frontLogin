export class Listas {

    estadosOrden: string[] = ['Registrada','Por Validar', 'Aprobada','Procesada','Entregada', 'Cancelada', 'Rechazada'];
    estados: Estados[] = [
        { value: 0, viewValue: '' },
        { value: 1, viewValue: 'Registrada' },
        { value: 2, viewValue: 'Por Validar' },
        { value: 3, viewValue: 'Aprobada' },
        { value: 4, viewValue: 'Procesada' },
        { value: 5, viewValue: 'Entregada' },
        { value: 6, viewValue: 'Cancelada' },
        { value: 7, viewValue: 'Rechazada' }
      ];
    constructor(       
      ) { }

    retornarEstadosOrden():string[]{
        return this.estadosOrden;
    }
}

export interface Estados {
    value: number;
    viewValue: string;
  }