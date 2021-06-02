import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ApiService } from './api.service';
@Injectable({
    providedIn: 'root'
})
export class UserService extends ApiService {
    wallet = new Subject<number>();
    apiURL: string = 'http://localhost:5008/api';
    public signin(params: any){
        return this.post(this.apiURL + '/auth/signin', params);
    }
    public signup(params: any){
        return this.post(this.apiURL + '/auth/signup', params);
    }
    public verifySignup(queryParams){
        return this.get(this.apiURL + '/auth/verify-signup', {params: queryParams});
    }
    public checkSignin(username: any){
        return this.get(this.apiURL + '/auth/check-signin/' + username);
    }
    public buyCourses(params: any){
        return this.post(this.apiURL + '/courses/buy', params);
    }
}
