/**
 * Servicio Productos Kallsonys
 * Servicio para la gestión de productos en  OMS Kallsonys
 *
 * OpenAPI spec version: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */


/**
 * Productos de la plataforma Kallsonys
 */
export interface Producto { 
    idProducto?: number;
    nombre?: string;
    descripcion?: string;
    valorBase?: number;
    idCategoria?: number;
    rutaImagen?: string;
    estado?: string;
}