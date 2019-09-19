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
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent }                           from '@angular/common/http';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';

import { Observable }                                        from 'rxjs';

import { RolRsType } from '../model/rolRsType';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class RolService {

    protected basePath = 'http://localhost/OMS/Empleados/v1';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
            this.basePath = basePath || configuration.basePath || this.basePath;
        }
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (const consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }


    /**
     * Consultar Rol por ID
     * Retorna un rol por id de empleado
     * @param headerRq Cabecera estándar
     * @param serviceID servKall3
     * @param idEmpleado Id del empleado a consultar rol
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public consultarRolPorId(headerRq: string, serviceID: string, idEmpleado: number, observe?: 'body', reportProgress?: boolean): Observable<RolRsType>;
    public consultarRolPorId(headerRq: string, serviceID: string, idEmpleado: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<RolRsType>>;
    public consultarRolPorId(headerRq: string, serviceID: string, idEmpleado: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<RolRsType>>;
    public consultarRolPorId(headerRq: string, serviceID: string, idEmpleado: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (headerRq === null || headerRq === undefined) {
            throw new Error('Required parameter headerRq was null or undefined when calling consultarRolPorId.');
        }

        if (serviceID === null || serviceID === undefined) {
            throw new Error('Required parameter serviceID was null or undefined when calling consultarRolPorId.');
        }

        if (idEmpleado === null || idEmpleado === undefined) {
            throw new Error('Required parameter idEmpleado was null or undefined when calling consultarRolPorId.');
        }

        let headers = this.defaultHeaders;
        if (headerRq !== undefined && headerRq !== null) {
            headers = headers.set('headerRq', String(headerRq));
        }
        if (serviceID !== undefined && serviceID !== null) {
            headers = headers.set('serviceID', String(serviceID));
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.get<RolRsType>(`${this.basePath}/rol/${encodeURIComponent(String(idEmpleado))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
