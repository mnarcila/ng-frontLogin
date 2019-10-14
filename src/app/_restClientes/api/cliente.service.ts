/**
 * Servicio Clientes Kallsonys
 * Servicio para la gestión de clientes en  OMS Kallsonys
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

import { Cliente } from '../model/cliente';
import { ClienteRsType } from '../model/clienteRsType';
import { ClientesRsType } from '../model/clientesRsType';
import { Direccion } from '../model/direccion';
import { DireccionesRsType } from '../model/direccionesRsType';
import { PostRsType } from '../model/postRsType';
import { StatusType } from '../model/statusType';

import { BASE_PATH, COLLECTION_FORMATS } from '../variables';
import { Configuration } from '../configuration';


@Injectable()
export class ClienteService {
    // http://localhost:8095/OMS/Productos/v1 //localhost
    // http://10.39.1.149:8280/OMS/Clientes/v1'; // endpoint
    //http://10.39.1.156:8210/esb-skynet ; // bus 
    protected basePath = 'http://10.39.1.149:8280/OMS/Clientes/v1';
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
     * Actualizar categoria del cliente
     * Actualizar categoria del cliente
     * @param headerRq Cabecera estándar
     * @param serviceID servKallcli
     * @param idCliente idCliente
     * @param idcategoria categoria del cliente
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public actualizarCategoriaCliente(headerRq: string, serviceID: string, idCliente: number, idcategoria: number, observe?: 'body', reportProgress?: boolean): Observable<StatusType>;
    public actualizarCategoriaCliente(headerRq: string, serviceID: string, idCliente: number, idcategoria: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<StatusType>>;
    public actualizarCategoriaCliente(headerRq: string, serviceID: string, idCliente: number, idcategoria: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<StatusType>>;
    public actualizarCategoriaCliente(headerRq: string, serviceID: string, idCliente: number, idcategoria: number, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

        if (headerRq === null || headerRq === undefined) {
            throw new Error('Required parameter headerRq was null or undefined when calling actualizarCategoriaCliente.');
        }

        if (serviceID === null || serviceID === undefined) {
            throw new Error('Required parameter serviceID was null or undefined when calling actualizarCategoriaCliente.');
        }

        if (idCliente === null || idCliente === undefined) {
            throw new Error('Required parameter idCliente was null or undefined when calling actualizarCategoriaCliente.');
        }

        if (idcategoria === null || idcategoria === undefined) {
            throw new Error('Required parameter idcategoria was null or undefined when calling actualizarCategoriaCliente.');
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

        return this.httpClient.put<StatusType>(`${this.basePath}/cliente/${encodeURIComponent(String(idCliente))}/categoria/${encodeURIComponent(String(idcategoria))}`,
            null,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Actualizar Cliente
     * Actualizar un cliente
     * @param headerRq Cabecera estándar
     * @param serviceID servKallcli
     * @param cliente Cliente a registrar
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public actualizarClientePorId(headerRq: string, serviceID: string, cliente: Cliente, observe?: 'body', reportProgress?: boolean): Observable<StatusType>;
    public actualizarClientePorId(headerRq: string, serviceID: string, cliente: Cliente, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<StatusType>>;
    public actualizarClientePorId(headerRq: string, serviceID: string, cliente: Cliente, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<StatusType>>;
    public actualizarClientePorId(headerRq: string, serviceID: string, cliente: Cliente, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

        if (headerRq === null || headerRq === undefined) {
            throw new Error('Required parameter headerRq was null or undefined when calling actualizarClientePorId.');
        }

        if (serviceID === null || serviceID === undefined) {
            throw new Error('Required parameter serviceID was null or undefined when calling actualizarClientePorId.');
        }

        if (cliente === null || cliente === undefined) {
            throw new Error('Required parameter cliente was null or undefined when calling actualizarClientePorId.');
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

        return this.httpClient.put<StatusType>(`${this.basePath}/cliente`,
            cliente,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Actualizar Direccion
     * Actualizar Direccion
     * @param headerRq Cabecera estándar
     * @param serviceID servKallcli
     * @param idUsuario id usuario actualizar direccion
     * @param idDireccion idUsuario direccion
     * @param direccion direccion actualizar
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public actualizarDireccion(headerRq: string, serviceID: string, idUsuario: number, idDireccion: number, direccion: Direccion, observe?: 'body', reportProgress?: boolean): Observable<StatusType>;
    public actualizarDireccion(headerRq: string, serviceID: string, idUsuario: number, idDireccion: number, direccion: Direccion, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<StatusType>>;
    public actualizarDireccion(headerRq: string, serviceID: string, idUsuario: number, idDireccion: number, direccion: Direccion, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<StatusType>>;
    public actualizarDireccion(headerRq: string, serviceID: string, idUsuario: number, idDireccion: number, direccion: Direccion, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

        if (headerRq === null || headerRq === undefined) {
            throw new Error('Required parameter headerRq was null or undefined when calling actualizarDireccion.');
        }

        if (serviceID === null || serviceID === undefined) {
            throw new Error('Required parameter serviceID was null or undefined when calling actualizarDireccion.');
        }

        if (idUsuario === null || idUsuario === undefined) {
            throw new Error('Required parameter idUsuario was null or undefined when calling actualizarDireccion.');
        }

        if (idDireccion === null || idDireccion === undefined) {
            throw new Error('Required parameter idDireccion was null or undefined when calling actualizarDireccion.');
        }

        if (direccion === null || direccion === undefined) {
            throw new Error('Required parameter direccion was null or undefined when calling actualizarDireccion.');
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

        return this.httpClient.put<StatusType>(`${this.basePath}/cliente/${encodeURIComponent(String(idUsuario))}/direccion/${encodeURIComponent(String(idDireccion))}`,
            direccion,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Consultar Cliente por ID
     * Retorna un Cliente
     * @param headerRq Cabecera estándar
     * @param serviceID servKallcli
     * @param idCliente Id del cliente a consultar
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public consultarClientePorId(headerRq: string, serviceID: string, idCliente: number, observe?: 'body', reportProgress?: boolean): Observable<ClienteRsType>;
    public consultarClientePorId(headerRq: string, serviceID: string, idCliente: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ClienteRsType>>;
    public consultarClientePorId(headerRq: string, serviceID: string, idCliente: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ClienteRsType>>;
    public consultarClientePorId(headerRq: string, serviceID: string, idCliente: number, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

        if (headerRq === null || headerRq === undefined) {
            throw new Error('Required parameter headerRq was null or undefined when calling consultarClientePorId.');
        }

        if (serviceID === null || serviceID === undefined) {
            throw new Error('Required parameter serviceID was null or undefined when calling consultarClientePorId.');
        }

        if (idCliente === null || idCliente === undefined) {
            throw new Error('Required parameter idCliente was null or undefined when calling consultarClientePorId.');
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

        return this.httpClient.get<ClienteRsType>(`${this.basePath}/cliente/${encodeURIComponent(String(idCliente))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Consultar Cliente por usuario
     * Retorna un cliente
     * @param headerRq Cabecera estándar
     * @param serviceID servKallcli
     * @param usuario usuario del cliente a consultar
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public consultarClientePorUsuario(headerRq: string, serviceID: string, usuario: string, observe?: 'body', reportProgress?: boolean): Observable<ClienteRsType>;
    public consultarClientePorUsuario(headerRq: string, serviceID: string, usuario: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ClienteRsType>>;
    public consultarClientePorUsuario(headerRq: string, serviceID: string, usuario: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ClienteRsType>>;
    public consultarClientePorUsuario(headerRq: string, serviceID: string, usuario: string, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

        if (headerRq === null || headerRq === undefined) {
            throw new Error('Required parameter headerRq was null or undefined when calling consultarClientePorUsuario.');
        }

        if (serviceID === null || serviceID === undefined) {
            throw new Error('Required parameter serviceID was null or undefined when calling consultarClientePorUsuario.');
        }

        if (usuario === null || usuario === undefined) {
            throw new Error('Required parameter usuario was null or undefined when calling consultarClientePorUsuario.');
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

        return this.httpClient.get<ClienteRsType>(`${this.basePath}/cliente/usuario/${encodeURIComponent(String(usuario))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Consultar Todos los clientes
     * Retorna todos los clientes
     * @param headerRq Cabecera estándar
     * @param serviceID servKallcli
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public consultarClientes(headerRq: string, serviceID: string, observe?: 'body', reportProgress?: boolean): Observable<ClientesRsType>;
    public consultarClientes(headerRq: string, serviceID: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ClientesRsType>>;
    public consultarClientes(headerRq: string, serviceID: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ClientesRsType>>;
    public consultarClientes(headerRq: string, serviceID: string, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

        if (headerRq === null || headerRq === undefined) {
            throw new Error('Required parameter headerRq was null or undefined when calling consultarClientes.');
        }

        if (serviceID === null || serviceID === undefined) {
            throw new Error('Required parameter serviceID was null or undefined when calling consultarClientes.');
        }

        let headers = this.defaultHeaders;
        if (headerRq !== undefined && headerRq !== null) {
            headers = headers.set('headerRq', String(headerRq));
        }
        if (serviceID !== undefined && serviceID !== null) {
            headers = headers.set('serviceID', String(serviceID));
        }
        // headers =headers.set('Content-Type', 'application/json');
        // headers =headers.set('Access-Control-Allow-Origin', '*');
        // // headers =headers.set('Access-Control-Request-Headers', 'access-control-allow-methods,access-control-allow-origin,authorization,content-type');
        // headers =headers.set('Access-Control-Allow-Headers', 'access-control-allow-methods,access-control-allow-origin,authorization,content-type');
        // headers =headers.set('Access-Control-Allow-Methods',  'GET, DELETE, POST, OPTIONS, PUT');
 
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

        return this.httpClient.get<ClientesRsType>(`${this.basePath}/clientes`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Consultar Todos las direcciones asociadas a un cliente
     * Retorna Todos las direcciones asociadas a un cliente
     * @param headerRq Cabecera estándar
     * @param serviceID servKallcli
     * @param usuario usuario a consultar
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public direccionesCliente(headerRq: string, serviceID: string, usuario: string, observe?: 'body', reportProgress?: boolean): Observable<DireccionesRsType>;
    public direccionesCliente(headerRq: string, serviceID: string, usuario: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<DireccionesRsType>>;
    public direccionesCliente(headerRq: string, serviceID: string, usuario: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<DireccionesRsType>>;
    public direccionesCliente(headerRq: string, serviceID: string, usuario: string, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

        if (headerRq === null || headerRq === undefined) {
            throw new Error('Required parameter headerRq was null or undefined when calling direccionesCliente.');
        }

        if (serviceID === null || serviceID === undefined) {
            throw new Error('Required parameter serviceID was null or undefined when calling direccionesCliente.');
        }

        if (usuario === null || usuario === undefined) {
            throw new Error('Required parameter usuario was null or undefined when calling direccionesCliente.');
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

        return this.httpClient.get<DireccionesRsType>(`${this.basePath}/cliente/${encodeURIComponent(String(usuario))}/direcciones`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Recuperar credenciales cliente
     * Recuperar credenciales cliente
     * @param headerRq Cabecera estándar
     * @param serviceID servKallcli
     * @param usuario usuario a recuperar credenciales
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public recuperarCredencialesCliente(headerRq: string, serviceID: string, usuario: string, observe?: 'body', reportProgress?: boolean): Observable<StatusType>;
    public recuperarCredencialesCliente(headerRq: string, serviceID: string, usuario: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<StatusType>>;
    public recuperarCredencialesCliente(headerRq: string, serviceID: string, usuario: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<StatusType>>;
    public recuperarCredencialesCliente(headerRq: string, serviceID: string, usuario: string, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

        if (headerRq === null || headerRq === undefined) {
            throw new Error('Required parameter headerRq was null or undefined when calling recuperarCredencialesCliente.');
        }

        if (serviceID === null || serviceID === undefined) {
            throw new Error('Required parameter serviceID was null or undefined when calling recuperarCredencialesCliente.');
        }

        if (usuario === null || usuario === undefined) {
            throw new Error('Required parameter usuario was null or undefined when calling recuperarCredencialesCliente.');
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

        return this.httpClient.post<StatusType>(`${this.basePath}/cliente/${encodeURIComponent(String(usuario))}/recuperar-credenciales`,
            null,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Registrar un Cliente
     * 
     * @param headerRq Cabecera estándar
     * @param serviceID servKallcli
     * @param cliente Cliente a registrar
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public registrarCliente(headerRq: string, serviceID: string, cliente: Cliente, observe?: 'body', reportProgress?: boolean): Observable<PostRsType>;
    public registrarCliente(headerRq: string, serviceID: string, cliente: Cliente, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<PostRsType>>;
    public registrarCliente(headerRq: string, serviceID: string, cliente: Cliente, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<PostRsType>>;
    public registrarCliente(headerRq: string, serviceID: string, cliente: Cliente, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

        if (headerRq === null || headerRq === undefined) {
            throw new Error('Required parameter headerRq was null or undefined when calling registrarCliente.');
        }

        if (serviceID === null || serviceID === undefined) {
            throw new Error('Required parameter serviceID was null or undefined when calling registrarCliente.');
        }

        if (cliente === null || cliente === undefined) {
            throw new Error('Required parameter cliente was null or undefined when calling registrarCliente.');
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

        return this.httpClient.post<PostRsType>(`${this.basePath}/cliente`,
            cliente,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Registrar Direccion
     * Registrar Direccion
     * @param headerRq Cabecera estándar
     * @param serviceID servKallcli
     * @param direccion direccion a registrar direccion
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public registrarDireccion(headerRq: string, serviceID: string, direccion: Direccion, observe?: 'body', reportProgress?: boolean): Observable<PostRsType>;
    public registrarDireccion(headerRq: string, serviceID: string, direccion: Direccion, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<PostRsType>>;
    public registrarDireccion(headerRq: string, serviceID: string, direccion: Direccion, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<PostRsType>>;
    public registrarDireccion(headerRq: string, serviceID: string, direccion: Direccion, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

        if (headerRq === null || headerRq === undefined) {
            throw new Error('Required parameter headerRq was null or undefined when calling registrarDireccion.');
        }

        if (serviceID === null || serviceID === undefined) {
            throw new Error('Required parameter serviceID was null or undefined when calling registrarDireccion.');
        }

        if (direccion === null || direccion === undefined) {
            throw new Error('Required parameter direccion was null or undefined when calling registrarDireccion.');
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

        return this.httpClient.post<PostRsType>(`${this.basePath}/cliente/direccion`,
            direccion,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
