/**
 * Servicio Ordenes Kallsonys
 * Servicio para la gestión de ordenes en  OMS Kallsonys
 *
 * OpenAPI spec version: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */


/**
 * Ordenes de la plataforma Kallsonys
 */
export interface OrdenM { 
    idOrden?: number;
    idCliente?: number;
    idDireccion?: number;
    valorTotal?: number;
    idproveedor?: number;
    iddespachador?:number;
    cantidadProductos?: number;
    fechaSolicitud?: string;
    fechaAprobacion?: string;
    fechaCierre?: string;
    estado?: number;
    comentario?: string;
    origen?: string;
    nomdespachador?: string;
    nomproveedor?: string;
    nomcliente?: string;
    direccion?: string;
}
