import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ApiService } from './api.service';
@Injectable({
    providedIn: 'root'
})
export class UserService extends ApiService {
    wallet = new Subject<number>();
    apiURL: string = 'http://localhost:5008/api';
    public signin(data: any){
        return this.post(this.apiURL + '/auth/signin', data);
    }
    public signup(data: any){
        return this.post(this.apiURL + '/auth/signup', data);
    }
    public verifySignup(queryParams){
        return this.get(this.apiURL + '/auth/verify-signup', {params: queryParams});
    }
    public checkSignin(username: any){
        return this.get(this.apiURL + '/auth/check-signin/' + username);
    }
    public buyCourses(data: any){
        return this.post(this.apiURL + '/courses/buy', data);
    }
    public forgetPassword(data: any){
        return this.post(this.apiURL + '/auth/forget-password', data);
    }
    public editUser(data: any) {
        return this.post(this.apiURL + '/user/edit', data);
    }
}
