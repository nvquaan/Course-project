import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    isLoggedIn: Subject<boolean> = new Subject();
    constructor() { }
}
