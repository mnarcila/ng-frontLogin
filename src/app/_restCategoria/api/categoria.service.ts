/**
 * Categoria Productos Kallsonys
 * Categoria Productos Kallsonys
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

import { CategoriaRsType } from '../model/categoriaRsType';
import { PostRsType } from '../model/postRsType';
import { ReqCategoria } from '../model/reqCategoria';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class CategoriaService {
    //'http://localhost:8387/OMS/categoria/v1'
    protected basePath = 'http://10.39.1.149:8387/OMS/categoria/v1';
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
     * Consulta todas las categorias
     * Retorna todos los empleados
     * @param headerRq Cabecera estándar
     * @param serviceID OM_SB31
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public consultarCategoria(headerRq: string, serviceID: string, observe?: 'body', reportProgress?: boolean): Observable<CategoriaRsType>;
    public consultarCategoria(headerRq: string, serviceID: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<CategoriaRsType>>;
    public consultarCategoria(headerRq: string, serviceID: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<CategoriaRsType>>;
    public consultarCategoria(headerRq: string, serviceID: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (headerRq === null || headerRq === undefined) {
            throw new Error('Required parameter headerRq was null or undefined when calling consultarLasCategoriasRelacionadasALosProductos.');
        }

        if (serviceID === null || serviceID === undefined) {
            throw new Error('Required parameter serviceID was null or undefined when calling consultarLasCategoriasRelacionadasALosProductos.');
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

        return this.httpClient.get<CategoriaRsType>(`${this.basePath}/consultarCategoria`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Registrar una nueva categoria
     * 
     * @param headerRq Cabecera estándar
     * @param serviceID OM_SB32
     * @param empleado Empleado a registrar
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public registrarCategoria(headerRq: string, serviceID: string, empleado: ReqCategoria, observe?: 'body', reportProgress?: boolean): Observable<PostRsType>;
    public registrarCategoria(headerRq: string, serviceID: string, empleado: ReqCategoria, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<PostRsType>>;
    public registrarCategoria(headerRq: string, serviceID: string, empleado: ReqCategoria, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<PostRsType>>;
    public registrarCategoria(headerRq: string, serviceID: string, empleado: ReqCategoria, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (headerRq === null || headerRq === undefined) {
            throw new Error('Required parameter headerRq was null or undefined when calling registrarCategoria.');
        }

        if (serviceID === null || serviceID === undefined) {
            throw new Error('Required parameter serviceID was null or undefined when calling registrarCategoria.');
        }

        if (empleado === null || empleado === undefined) {
            throw new Error('Required parameter empleado was null or undefined when calling registrarCategoria.');
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

        return this.httpClient.post<PostRsType>(`${this.basePath}/registrarCategoria`,
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