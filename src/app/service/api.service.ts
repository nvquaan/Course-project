import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
    providedIn: 'root'
})
export class ApiService {
    headers = new HttpHeaders();
    constructor(private http: HttpClient) {
        this.headers = this.headers.set('Accept', 'application/json');
        this.headers = this.headers.set('Content-Type', 'application/json; charset=utf-8');
    }
    get(url: string, params?: any) {
        let accessToken = localStorage.getItem('x-access-token');
        if(accessToken)
        this.headers = this.headers.set('x-access-Token',  accessToken);
        return this.http.get(url, { headers: this.headers, params });
    }
    post(url: string, data: any) {
        return this.http.post(url, data);
    }
    put(url: string, data: any) {
        return this.http.put(url, data);
    }
    delete(url: string) {
        return this.http.delete(url);
    }
}
