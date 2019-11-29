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
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent }                           from '@angular/common/http';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';

import { Observable }                                        from 'rxjs/Observable';

import { OrdenRsType } from '../model/ordenRsType';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';
import { DetalleOrden } from '../model/detalleOrden';


@Injectable()
export class DetalleOrdenService {

    //protected basePath = 'http://10.39.1.149:8096/OMS/Ordenes/v1';
    protected basePath = 'http://localhost:8096/OMS/Ordenes/v1';
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
     * Consultar Detalle por IdOrden
     * Retorna una orden
     * @param headerRq Cabecera estándar
     * @param serviceID servKall4
     * @param idOrden Id del orden a consultar Detalle
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public conultarDetalleOrdenPorIdOrden(headerRq: string, serviceID: string, idOrden: number, observe?: 'body', reportProgress?: boolean): Observable<OrdenRsType>;
    public conultarDetalleOrdenPorIdOrden(headerRq: string, serviceID: string, idOrden: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<OrdenRsType>>;
    public conultarDetalleOrdenPorIdOrden(headerRq: string, serviceID: string, idOrden: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<OrdenRsType>>;
    public conultarDetalleOrdenPorIdOrden(headerRq: string, serviceID: string, idOrden: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (headerRq === null || headerRq === undefined) {
            throw new Error('Required parameter headerRq was null or undefined when calling conultarDetalleOrdenPorIdOrden.');
        }

        if (serviceID === null || serviceID === undefined) {
            throw new Error('Required parameter serviceID was null or undefined when calling conultarDetalleOrdenPorIdOrden.');
        }

        if (idOrden === null || idOrden === undefined) {
            throw new Error('Required parameter idOrden was null or undefined when calling conultarDetalleOrdenPorIdOrden.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (idOrden !== undefined && idOrden !== null) {
            queryParameters = queryParameters.set('idOrden', <any>idOrden);
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

        return this.httpClient.get<OrdenRsType>(`${this.basePath}/orden/detallePorIdOrden`,
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
     * Registrar Detalle de una orden
     * retorna el detalle creado
     * @param headerRq Cabecera estándar
     * @param serviceID servKall4
     * @param detOrden Detalle Orden a registrar
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public registrarDetalleOrden(headerRq: string, serviceID: string, detOrden: DetalleOrden, observe?: 'body', reportProgress?: boolean): Observable<OrdenRsType>;
    public registrarDetalleOrden(headerRq: string, serviceID: string, detOrden: DetalleOrden, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<OrdenRsType>>;
    public registrarDetalleOrden(headerRq: string, serviceID: string, detOrden: DetalleOrden, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<OrdenRsType>>;
    public registrarDetalleOrden(headerRq: string, serviceID: string, detOrden: DetalleOrden, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (headerRq === null || headerRq === undefined) {
            throw new Error('Required parameter headerRq was null or undefined when calling registrarDetalleOrden.');
        }

        if (serviceID === null || serviceID === undefined) {
            throw new Error('Required parameter serviceID was null or undefined when calling registrarDetalleOrden.');
        }

        if (detOrden === null || detOrden === undefined) {
            throw new Error('Required parameter detOrden was null or undefined when calling registrarDetalleOrden.');
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

        return this.httpClient.post<OrdenRsType>(`${this.basePath}/orden/detalleOrden/`,
            detOrden,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
