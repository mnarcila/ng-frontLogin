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


/**
 * A JSONPatch document as defined by RFC 6902
 */
export interface PatchDocument { 
    /**
     * The operation to be performed
     */
    op: PatchDocument.OpEnum;
    /**
     * A JSON-Pointer
     */
    path: string;
    /**
     * The value to be used within the operations.
     */
    value?: any;
    /**
     * A string containing a JSON Pointer value.
     */
    from?: string;
}
export namespace PatchDocument {
    export type OpEnum = 'add' | 'remove' | 'replace' | 'move' | 'copy' | 'test';
    export const OpEnum = {
        Add: 'add' as OpEnum,
        Remove: 'remove' as OpEnum,
        Replace: 'replace' as OpEnum,
        Move: 'move' as OpEnum,
        Copy: 'copy' as OpEnum,
        Test: 'test' as OpEnum
    };
}