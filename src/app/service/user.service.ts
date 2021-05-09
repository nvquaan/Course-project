import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
@Injectable({
    providedIn: 'root'
})
export class UserService extends ApiService {
    apiURL: string = 'http://localhost:5008/api';
    public signin(params: any){
        return this.post(this.apiURL + '/auth/signin', params);
    }
    public signup(params: any){
        return this.post(this.apiURL + '/auth/signup', params);
    }
    public checkSignin(params?: any){
        return this.get(this.apiURL + '/auth/check-signin', params);
    }
}
