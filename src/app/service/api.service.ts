import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  headers = new HttpHeaders();
  constructor(private http: HttpClient) {
    this.headers.set('Accept', 'application/json');
    this.headers.set('Content-Type', 'application/json; charset=utf-8');
    this.headers.set('Access-Control-Allow-Origin', '*');
  }
  get(url: string, params?: any) {
    return this.http.get(url, {headers: this.headers, params});
  }
  post(url: string, data: any) {
    return this.http.post(url, data);
  }
  delete(url: string) {
    return this.http.delete(url);
  }
}