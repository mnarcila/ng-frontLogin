/**
 * Servicio Ordenes Kallsonys
 * Servicio para la gestiÃ³n de ordenes en  OMS Kallsonys
 *
 * OpenAPI spec version: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional } from '@angular/core';
import {
    HttpClient, HttpHeaders, HttpParams,
    HttpResponse, HttpEvent
} from '@angular/common/http';
import { CustomHttpUrlEncodingCodec } from '../encoder';
import { Observable } from 'rxjs/Observable';
import { OrdenM } from '../model/ordenM';
import { OrdenRsType } from '../model/ordenRsType';
import { BASE_PATH, COLLECTION_FORMATS } from '../variables';
import { Configuration } from '../configuration';


@Injectable()
export class OrdenService {
    //http://10.39.1.149:8096/OMS/Ordenes/v1
    // http://10.39.1.149:8280/OMS/Clientes/v1'; // endpoint
    //http://10.39.1.156:8210/esb-skynet ; // bus 
    protected basePath = 'http://10.39.1.149:8096/OMS/Ordenes/v1';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient, @Optional() @Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
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
     * Actualizar Inactivar Orden por ID
     * Actualizar un orden
     * @param headerRq Cabecera estÃ¡ndar
     * @param serviceID servKall4
     * @param idOrden Id del orden a inactivar
     * @param orden 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public actualizarOrdenPorId(headerRq: string, serviceID: string, idOrden: number, orden: OrdenM, observe?: 'body', reportProgress?: boolean): Observable<OrdenRsType>;
    public actualizarOrdenPorId(headerRq: string, serviceID: string, idOrden: number, orden: OrdenM, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<OrdenRsType>>;
    public actualizarOrdenPorId(headerRq: string, serviceID: string, idOrden: number, orden: OrdenM, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<OrdenRsType>>;
    public actualizarOrdenPorId(headerRq: string, serviceID: string, idOrden: number, orden: OrdenM, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

        if (headerRq === null || headerRq === undefined) {
            throw new Error('Required parameter headerRq was null or undefined when calling actualizarOrdenPorId.');
        }

        if (serviceID === null || serviceID === undefined) {
            throw new Error('Required parameter serviceID was null or undefined when calling actualizarOrdenPorId.');
        }

        if (idOrden === null || idOrden === undefined) {
            throw new Error('Required parameter idOrden was null or undefined when calling actualizarOrdenPorId.');
        }

        if (orden === null || orden === undefined) {
            throw new Error('Required parameter orden was null or undefined when calling actualizarOrdenPorId.');
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

        return this.httpClient.put<OrdenRsType>(`${this.basePath}/orden/${encodeURIComponent(String(idOrden))}`,
            orden,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Consultar Orden por Cliente
     * Retorna un orden
     * @param headerRq Cabecera estÃ¡ndar
     * @param serviceID servKall4
     * @param idCliente idCliente
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public conultarOrdenPorCliente(headerRq: string, serviceID: string, idCliente: string, observe?: 'body', reportProgress?: boolean): Observable<OrdenRsType>;
    public conultarOrdenPorCliente(headerRq: string, serviceID: string, idCliente: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<OrdenRsType>>;
    public conultarOrdenPorCliente(headerRq: string, serviceID: string, idCliente: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<OrdenRsType>>;
    public conultarOrdenPorCliente(headerRq: string, serviceID: string, idCliente: string, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

        if (headerRq === null || headerRq === undefined) {
            throw new Error('Required parameter headerRq was null or undefined when calling conultarOrdenPorCliente.');
        }

        if (serviceID === null || serviceID === undefined) {
            throw new Error('Required parameter serviceID was null or undefined when calling conultarOrdenPorCliente.');
        }

        if (idCliente === null || idCliente === undefined) {
            throw new Error('Required parameter idCliente was null or undefined when calling conultarOrdenPorCliente.');
        }

        let queryParameters = new HttpParams({ encoder: new CustomHttpUrlEncodingCodec() });
        if (idCliente !== undefined && idCliente !== null) {
            queryParameters = queryParameters.set('idCliente', <any>idCliente);
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

        return this.httpClient.get<OrdenRsType>(`${this.basePath}/orden/consultarPorCliente`,
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
     * Consultar Orden por ID
     * Retorna un orden
     * @param headerRq Cabecera estÃ¡ndar
     * @param serviceID servKall4
     * @param idOrden Id del orden a consultar
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public conultarOrdenPorId(headerRq: string, serviceID: string, idOrden: number, observe?: 'body', reportProgress?: boolean): Observable<OrdenRsType>;
    public conultarOrdenPorId(headerRq: string, serviceID: string, idOrden: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<OrdenRsType>>;
    public conultarOrdenPorId(headerRq: string, serviceID: string, idOrden: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<OrdenRsType>>;
    public conultarOrdenPorId(headerRq: string, serviceID: string, idOrden: number, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

        if (headerRq === null || headerRq === undefined) {
            throw new Error('Required parameter headerRq was null or undefined when calling conultarOrdenPorId.');
        }

        if (serviceID === null || serviceID === undefined) {
            throw new Error('Required parameter serviceID was null or undefined when calling conultarOrdenPorId.');
        }

        if (idOrden === null || idOrden === undefined) {
            throw new Error('Required parameter idOrden was null or undefined when calling conultarOrdenPorId.');
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

        return this.httpClient.get<OrdenRsType>(`${this.basePath}/orden/${encodeURIComponent(String(idOrden))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Consultar Ordenes por estado
     * Retorna ordenes por estado
     * @param headerRq Cabecera estÃ¡ndar
     * @param serviceID servKall4
     * @param idEstado idEstado
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public conultarOrdenesPorEstado(headerRq: string, serviceID: string, idEstado: number, observe?: 'body', reportProgress?: boolean): Observable<OrdenRsType>;
    public conultarOrdenesPorEstado(headerRq: string, serviceID: string, idEstado: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<OrdenRsType>>;
    public conultarOrdenesPorEstado(headerRq: string, serviceID: string, idEstado: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<OrdenRsType>>;
    public conultarOrdenesPorEstado(headerRq: string, serviceID: string, idEstado: number, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

        if (headerRq === null || headerRq === undefined) {
            throw new Error('Required parameter headerRq was null or undefined when calling conultarOrdenesPorEstado.');
        }

        if (serviceID === null || serviceID === undefined) {
            throw new Error('Required parameter serviceID was null or undefined when calling conultarOrdenesPorEstado.');
        }

        if (idEstado === null || idEstado === undefined) {
            throw new Error('Required parameter idEstado was null or undefined when calling conultarOrdenesPorEstado.');
        }

        let queryParameters = new HttpParams({ encoder: new CustomHttpUrlEncodingCodec() });
        if (idEstado !== undefined && idEstado !== null) {
            queryParameters = queryParameters.set('idEstado', <any>idEstado);
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

        return this.httpClient.get<OrdenRsType>(`${this.basePath}/orden/consultarPorEstado`,
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
     * Consultar Detalle por IdProducto
     * Retorna una orden por producto
     * @param headerRq Cabecera estÃ¡ndar
     * @param serviceID servKall4
     * @param idProducto Id del producto para listar las ordenes que lo contienen
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public conultarOrdenesPorIdProducto(headerRq: string, serviceID: string, idProducto: string, observe?: 'body', reportProgress?: boolean): Observable<OrdenRsType>;
    public conultarOrdenesPorIdProducto(headerRq: string, serviceID: string, idProducto: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<OrdenRsType>>;
    public conultarOrdenesPorIdProducto(headerRq: string, serviceID: string, idProducto: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<OrdenRsType>>;
    public conultarOrdenesPorIdProducto(headerRq: string, serviceID: string, idProducto: string, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

        if (headerRq === null || headerRq === undefined) {
            throw new Error('Required parameter headerRq was null or undefined when calling conultarOrdenesPorIdProducto.');
        }

        if (serviceID === null || serviceID === undefined) {
            throw new Error('Required parameter serviceID was null or undefined when calling conultarOrdenesPorIdProducto.');
        }

        if (idProducto === null || idProducto === undefined) {
            throw new Error('Required parameter idProducto was null or undefined when calling conultarOrdenesPorIdProducto.');
        }

        let queryParameters = new HttpParams({ encoder: new CustomHttpUrlEncodingCodec() });
        if (idProducto !== undefined && idProducto !== null) {
            queryParameters = queryParameters.set('idProducto', <any>idProducto);
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

        return this.httpClient.get<OrdenRsType>(`${this.basePath}/orden/ordenesPorProducto`,
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
     * Registrar una Orden
     * 
     * @param headerRq Cabecera estÃ¡ndar
     * @param serviceID servKall4
     * @param orden Orden a registrar
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public registrarOrden(headerRq: string, serviceID: string, orden: OrdenM, observe?: 'body', reportProgress?: boolean): Observable<OrdenRsType>;
    public registrarOrden(headerRq: string, serviceID: string, orden: OrdenM, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<OrdenRsType>>;
    public registrarOrden(headerRq: string, serviceID: string, orden: OrdenM, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<OrdenRsType>>;
    public registrarOrden(headerRq: string, serviceID: string, orden: OrdenM, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

        if (headerRq === null || headerRq === undefined) {
            throw new Error('Required parameter headerRq was null or undefined when calling registrarOrden.');
        }

        if (serviceID === null || serviceID === undefined) {
            throw new Error('Required parameter serviceID was null or undefined when calling registrarOrden.');
        }

        if (orden === null || orden === undefined) {
            throw new Error('Required parameter orden was null or undefined when calling registrarOrden.');
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

        return this.httpClient.post<OrdenRsType>(`${this.basePath}/orden`,
            orden,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
