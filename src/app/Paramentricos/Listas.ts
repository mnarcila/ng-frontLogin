export class Listas {
  
  constructor(       
    ) { }
    
    estadosOrden: string[] = ['Registrada','Por Validar', 'Aprobada','Procesada','Entregada', 'Cancelada', 'Rechazada'];
    estados: Estados[] = [
        { value: 1, viewValue: 'Registrada' },
        { value: 2, viewValue: 'Por Validar' },
        { value: 3, viewValue: 'Aprobada' },
        { value: 4, viewValue: 'Procesada' },
        { value: 5, viewValue: 'Entregada' },
        { value: 6, viewValue: 'Cancelada' },
        { value: 7, viewValue: 'Rechazada' }
    ];
    listaTipoId: tipoIdentificacion[] = [
      { value: 'PA', viewValue: 'Pasaporte' },
      { value: 'CC', viewValue: 'Cedulad de Ciudadanía' },
      { value: 'CE', viewValue: 'Cedula de extranjeria' },
      { value: 'PE', viewValue: 'Permiso Especial' },
    ];
    listaProveedores: ListaProveedores[] = [
      { value: 1, viewValue: 'SONY' },
      { value: 2, viewValue: 'RAPID SERVICE' },
    ];


    retornarEstadosOrden():string[]{
        return this.estadosOrden;
    }
}

export interface Estados {
    value: number;
    viewValue: string;
  }

export interface tipoIdentificacion {
  value: string;
  viewValue: string;
}

export interface ListaProveedores {
  value: number;
  viewValue: string;
}