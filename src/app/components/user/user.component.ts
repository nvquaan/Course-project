import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
    courses;
    user;
    wallet;
    constructor() { }

    ngOnInit() {
        this.courses = JSON.parse(localStorage.getItem('bought'));
        this.user = JSON.parse(localStorage.getItem('fullinfo'));
        this.wallet = JSON.parse(localStorage.getItem('wallet'));
    }

}
