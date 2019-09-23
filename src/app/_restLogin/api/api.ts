export * from './empleado.service';
import { EmpleadoService } from './empleado.service';
export * from './empleados.service';
import { EmpleadosService } from './empleados.service';
export * from './rol.service';
import { RolService } from './rol.service';
export const APIS = [EmpleadoService, EmpleadosService, RolService];
