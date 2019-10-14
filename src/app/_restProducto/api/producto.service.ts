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
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent }                           from '@angular/common/http';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';

import { Observable }                                        from 'rxjs/Observable';

import { Producto } from '../model/producto';
import { ProductoRsType } from '../model/productoRsType';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class ProductoService {
    // http://10.39.1.149:8095
    // http://localhost:8095/OMS/Productos/v1
    // http://10.39.1.156:8210/esb-skynet
    protected basePath = 'http://10.39.1.156:8210/esb-skynet';
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
     * Actualizar Inactivar Producto por ID
     * Actualizar un producto
     * @param headerRq Cabecera estándar
     * @param serviceID sb2s1
     * @param idProducto Id del producto a inactivar
     * @param jsonPatch 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public actualizarProductoPorId(headerRq: string, serviceID: string, idProducto: number, jsonPatch: Producto, observe?: 'body', reportProgress?: boolean): Observable<ProductoRsType>;
    public actualizarProductoPorId(headerRq: string, serviceID: string, idProducto: number, jsonPatch: Producto, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ProductoRsType>>;
    public actualizarProductoPorId(headerRq: string, serviceID: string, idProducto: number, jsonPatch: Producto, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ProductoRsType>>;
    public actualizarProductoPorId(headerRq: string, serviceID: string, idProducto: number, jsonPatch: Producto, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (headerRq === null || headerRq === undefined) {
            throw new Error('Required parameter headerRq was null or undefined when calling actualizarProductoPorId.');
        }

        if (serviceID === null || serviceID === undefined) {
            throw new Error('Required parameter serviceID was null or undefined when calling actualizarProductoPorId.');
        }

        if (idProducto === null || idProducto === undefined) {
            throw new Error('Required parameter idProducto was null or undefined when calling actualizarProductoPorId.');
        }

        if (jsonPatch === null || jsonPatch === undefined) {
            throw new Error('Required parameter jsonPatch was null or undefined when calling actualizarProductoPorId.');
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

        return this.httpClient.put<ProductoRsType>(`${this.basePath}/producto/${encodeURIComponent(String(idProducto))}`,
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
     * Consultar Producto por Descripcion
     * Retorna un producto
     * @param headerRq Cabecera estándar
     * @param serviceID sb2s1
     * @param descripcionProducto Descripcion del producto a consultar
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public conultarProductoPorDescripcion(headerRq: string, serviceID: string, descripcionProducto: string, observe?: 'body', reportProgress?: boolean): Observable<ProductoRsType>;
    public conultarProductoPorDescripcion(headerRq: string, serviceID: string, descripcionProducto: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ProductoRsType>>;
    public conultarProductoPorDescripcion(headerRq: string, serviceID: string, descripcionProducto: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ProductoRsType>>;
    public conultarProductoPorDescripcion(headerRq: string, serviceID: string, descripcionProducto: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (headerRq === null || headerRq === undefined) {
            throw new Error('Required parameter headerRq was null or undefined when calling conultarProductoPorDescripcion.');
        }

        if (serviceID === null || serviceID === undefined) {
            throw new Error('Required parameter serviceID was null or undefined when calling conultarProductoPorDescripcion.');
        }

        if (descripcionProducto === null || descripcionProducto === undefined) {
            throw new Error('Required parameter descripcionProducto was null or undefined when calling conultarProductoPorDescripcion.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (descripcionProducto !== undefined && descripcionProducto !== null) {
            queryParameters = queryParameters.set('descripcionProducto', <any>descripcionProducto);
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

        return this.httpClient.get<ProductoRsType>(`${this.basePath}/producto/consultarPorDescripcion`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Consultar Producto por ID
     * Retorna un producto
     * @param headerRq Cabecera estándar
     * @param serviceID sb2s1
     * @param idProducto Id del producto a consultar
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public conultarProductoPorId(headerRq: string, serviceID: string, idProducto: number, observe?: 'body', reportProgress?: boolean): Observable<ProductoRsType>;
    public conultarProductoPorId(headerRq: string, serviceID: string, idProducto: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ProductoRsType>>;
    public conultarProductoPorId(headerRq: string, serviceID: string, idProducto: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ProductoRsType>>;
    public conultarProductoPorId(headerRq: string, serviceID: string, idProducto: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (headerRq === null || headerRq === undefined) {
            throw new Error('Required parameter headerRq was null or undefined when calling conultarProductoPorId.');
        }

        if (serviceID === null || serviceID === undefined) {
            throw new Error('Required parameter serviceID was null or undefined when calling conultarProductoPorId.');
        }

        if (idProducto === null || idProducto === undefined) {
            throw new Error('Required parameter idProducto was null or undefined when calling conultarProductoPorId.');
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

        return this.httpClient.get<ProductoRsType>(`${this.basePath}/producto/${encodeURIComponent(String(idProducto))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Consultar Producto por nombre
     * Retorna un producto
     * @param headerRq Cabecera estándar
     * @param serviceID sb2s1
     * @param nombreProducto Nombre del producto a consultar
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public conultarProductoPorNombre(headerRq: string, serviceID: string, nombreProducto: string, observe?: 'body', reportProgress?: boolean): Observable<ProductoRsType>;
    public conultarProductoPorNombre(headerRq: string, serviceID: string, nombreProducto: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ProductoRsType>>;
    public conultarProductoPorNombre(headerRq: string, serviceID: string, nombreProducto: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ProductoRsType>>;
    public conultarProductoPorNombre(headerRq: string, serviceID: string, nombreProducto: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (headerRq === null || headerRq === undefined) {
            throw new Error('Required parameter headerRq was null or undefined when calling conultarProductoPorNombre.');
        }

        if (serviceID === null || serviceID === undefined) {
            throw new Error('Required parameter serviceID was null or undefined when calling conultarProductoPorNombre.');
        }

        if (nombreProducto === null || nombreProducto === undefined) {
            throw new Error('Required parameter nombreProducto was null or undefined when calling conultarProductoPorNombre.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (nombreProducto !== undefined && nombreProducto !== null) {
            queryParameters = queryParameters.set('nombreProducto', <any>nombreProducto);
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

        return this.httpClient.get<ProductoRsType>(`${this.basePath}/producto/consultarPorNombre`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Registrar un Producto
     * 
     * @param headerRq Cabecera estándar
     * @param serviceID soms1
     * @param producto Producto a registrar
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public registrarProducto(headerRq: string, serviceID: string, producto: Producto, observe?: 'body', reportProgress?: boolean): Observable<ProductoRsType>;
    public registrarProducto(headerRq: string, serviceID: string, producto: Producto, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ProductoRsType>>;
    public registrarProducto(headerRq: string, serviceID: string, producto: Producto, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ProductoRsType>>;
    public registrarProducto(headerRq: string, serviceID: string, producto: Producto, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (headerRq === null || headerRq === undefined) {
            throw new Error('Required parameter headerRq was null or undefined when calling registrarProducto.');
        }

        if (serviceID === null || serviceID === undefined) {
            throw new Error('Required parameter serviceID was null or undefined when calling registrarProducto.');
        }

        if (producto === null || producto === undefined) {
            throw new Error('Required parameter producto was null or undefined when calling registrarProducto.');
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

        return this.httpClient.post<ProductoRsType>(`${this.basePath}/producto`,
            producto,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
