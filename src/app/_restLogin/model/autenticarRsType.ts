/**
 * Servicio Empleados Kallsonys
 * Servicio para la gestión de empleados en  OMS Kallsonys
 *
 * OpenAPI spec version: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { StatusType } from './statusType';


export interface AutenticarRsType { 
    status?: StatusType;
    /**
     * Estado de autenticacion
     */
    autenticacion?: boolean;
}