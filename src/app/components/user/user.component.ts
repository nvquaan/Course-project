import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
    courses=[];
    user;
    wallet;
    role;
    constructor() { }

    ngOnInit() {
        this.courses = JSON.parse(localStorage.getItem('bought'));
        this.user = JSON.parse(localStorage.getItem('fullinfo'));
        this.wallet = JSON.parse(localStorage.getItem('wallet'));
        if(this.user)
        this.role = this.checkRole(this.user);

    }

    checkRole(user) {
        if(user.roles.includes('ROLE_ADMIN')) return 'ADMIN';
        if(user.roles.includes('ROLE_MODERATOR')) return 'MODERATOR';
        if(user.roles.includes('ROLE_USER')) return 'USER';
    }
}
