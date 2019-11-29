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

import { Observable }                                        from 'rxjs/Observable';

import { Empleado } from '../model/empleado';
import { EmpleadoRsType } from '../model/empleadoRsType';
import { PatchRequest } from '../model/patchRequest';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class EmpleadoService {

    protected basePath = 'http://172.16.2.213:8210/esb-skynet';
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
     * Actualizar Inactivar Empleado por ID
     * Actualizar un empleado
     * @param headerRq Cabecera estándar
     * @param serviceID servKall3
     * @param idEmpleado Id del empleado a inactivar
     * @param jsonPatch 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public actualizarEmpleadoPorId(headerRq: string, serviceID: string, idEmpleado: number, jsonPatch: PatchRequest, observe?: 'body', reportProgress?: boolean): Observable<EmpleadoRsType>;
    public actualizarEmpleadoPorId(headerRq: string, serviceID: string, idEmpleado: number, jsonPatch: PatchRequest, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<EmpleadoRsType>>;
    public actualizarEmpleadoPorId(headerRq: string, serviceID: string, idEmpleado: number, jsonPatch: PatchRequest, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<EmpleadoRsType>>;
    public actualizarEmpleadoPorId(headerRq: string, serviceID: string, idEmpleado: number, jsonPatch: PatchRequest, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (headerRq === null || headerRq === undefined) {
            throw new Error('Required parameter headerRq was null or undefined when calling actualizarEmpleadoPorId.');
        }

        if (serviceID === null || serviceID === undefined) {
            throw new Error('Required parameter serviceID was null or undefined when calling actualizarEmpleadoPorId.');
        }

        if (idEmpleado === null || idEmpleado === undefined) {
            throw new Error('Required parameter idEmpleado was null or undefined when calling actualizarEmpleadoPorId.');
        }

        if (jsonPatch === null || jsonPatch === undefined) {
            throw new Error('Required parameter jsonPatch was null or undefined when calling actualizarEmpleadoPorId.');
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
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.patch<EmpleadoRsType>(`${this.basePath}/empleado/${encodeURIComponent(String(idEmpleado))}`,
            jsonPatch,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Autenticar Empleado
     * Autenticar un empleado
     * @param headerRq Cabecera estándar
     * @param serviceID servKall3
     * @param usuario Id del empleado a consultar
     * @param pass Id del empleado a consultar
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public autenticarEmpleado(headerRq: string, serviceID: string, usuario: string, pass: string, observe?: 'body', reportProgress?: boolean): Observable<EmpleadoRsType>;
    public autenticarEmpleado(headerRq: string, serviceID: string, usuario: string, pass: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<EmpleadoRsType>>;
    public autenticarEmpleado(headerRq: string, serviceID: string, usuario: string, pass: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<EmpleadoRsType>>;
    public autenticarEmpleado(headerRq: string, serviceID: string, usuario: string, pass: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (headerRq === null || headerRq === undefined) {
            throw new Error('Required parameter headerRq was null or undefined when calling autenticarEmpleado.');
        }

        if (serviceID === null || serviceID === undefined) {
            throw new Error('Required parameter serviceID was null or undefined when calling autenticarEmpleado.');
        }

        if (usuario === null || usuario === undefined) {
            throw new Error('Required parameter usuario was null or undefined when calling autenticarEmpleado.');
        }

        if (pass === null || pass === undefined) {
            throw new Error('Required parameter pass was null or undefined when calling autenticarEmpleado.');
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

        return this.httpClient.get<EmpleadoRsType>(`${this.basePath}/empleado/authenticationService/${encodeURIComponent(String(usuario))}/${encodeURIComponent(String(pass))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Consultar Empleado por ID
     * Retorna un empleado
     * @param headerRq Cabecera estándar
     * @param serviceID servKall3
     * @param idEmpleado Id del empleado a consultar
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public conultarEmpleadoPorId(headerRq: string, serviceID: string, idEmpleado: number, observe?: 'body', reportProgress?: boolean): Observable<EmpleadoRsType>;
    public conultarEmpleadoPorId(headerRq: string, serviceID: string, idEmpleado: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<EmpleadoRsType>>;
    public conultarEmpleadoPorId(headerRq: string, serviceID: string, idEmpleado: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<EmpleadoRsType>>;
    public conultarEmpleadoPorId(headerRq: string, serviceID: string, idEmpleado: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (headerRq === null || headerRq === undefined) {
            throw new Error('Required parameter headerRq was null or undefined when calling conultarEmpleadoPorId.');
        }

        if (serviceID === null || serviceID === undefined) {
            throw new Error('Required parameter serviceID was null or undefined when calling conultarEmpleadoPorId.');
        }

        if (idEmpleado === null || idEmpleado === undefined) {
            throw new Error('Required parameter idEmpleado was null or undefined when calling conultarEmpleadoPorId.');
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

        return this.httpClient.get<EmpleadoRsType>(`${this.basePath}/empleado/${encodeURIComponent(String(idEmpleado))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Registrar un Empleado
     * 
     * @param headerRq Cabecera estándar
     * @param serviceID servKall3
     * @param empleado Empleado a registrar
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public registrarEmpleado(headerRq: string, serviceID: string, empleado: Empleado, observe?: 'body', reportProgress?: boolean): Observable<EmpleadoRsType>;
    public registrarEmpleado(headerRq: string, serviceID: string, empleado: Empleado, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<EmpleadoRsType>>;
    public registrarEmpleado(headerRq: string, serviceID: string, empleado: Empleado, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<EmpleadoRsType>>;
    public registrarEmpleado(headerRq: string, serviceID: string, empleado: Empleado, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (headerRq === null || headerRq === undefined) {
            throw new Error('Required parameter headerRq was null or undefined when calling registrarEmpleado.');
        }

        if (serviceID === null || serviceID === undefined) {
            throw new Error('Required parameter serviceID was null or undefined when calling registrarEmpleado.');
        }

        if (empleado === null || empleado === undefined) {
            throw new Error('Required parameter empleado was null or undefined when calling registrarEmpleado.');
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
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.post<EmpleadoRsType>(`${this.basePath}/empleado`,
            empleado,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
