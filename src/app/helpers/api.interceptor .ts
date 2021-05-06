import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const accessToken = localStorage.getItem('x-access-token') || '';
        // request = request.clone({ headers: request.headers.set('Accept', 'application/json') });
        // request = request.clone({ headers: request.headers.set('Content-Type', 'application/json; charset=utf-8') });
        // if (accessToken) {
        //     request = request.clone({ headers: request.headers.set('x-access-token', JSON.stringify(accessToken)) || '' });
        // }
        // const  headers = new HttpHeaders(
        //     {
        //     Accept: 'application/json',
        //     'Content-Type': 'application/json',
        //     'x-api-key': JSON.stringify(accessToken),
        //     }); 
        //     headers.set('Access-Control-Allow-Origin', '*');
        //   const newRequest = request.clone({headers});
        let authReq = request;
        if (request.url.includes('themoviedb')) {
            return next.handle(authReq);
        }
        else {
            if (accessToken) {
                authReq = request.clone({ headers: request.headers.set('x-access-token', accessToken) });
            }
            return next.handle(authReq);
        }

    }
}