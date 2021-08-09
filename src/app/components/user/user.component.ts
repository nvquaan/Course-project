import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { UserService } from 'src/app/service/user.service';
import { EditUserComponent } from '../includes/edit-user/edit-user.component';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
    courses = [];
    user;
    wallet;
    role;
    constructor(private dialog: MatDialog, private userService: UserService, private cdr: ChangeDetectorRef) { }

    ngOnInit() {
        this.courses = JSON.parse(localStorage.getItem('bought'));
        console.log(this.courses);
        this.user = JSON.parse(localStorage.getItem('fullinfo'));
        this.wallet = JSON.parse(localStorage.getItem('wallet'));
        if (this.user)
            this.role = this.checkRole(this.user);

    }

    checkRole(user) {
        if (user.roles.includes('ROLE_ADMIN')) return 'ADMIN';
        if (user.roles.includes('ROLE_MODERATOR')) return 'MODERATOR';
        if (user.roles.includes('ROLE_USER')) return 'USER';
    }

    onShowEdit() {
        this.dialog.open(EditUserComponent, {
            width: '800px',
            data: this.user,
        }).afterClosed().subscribe(res => {
            if (res) {
                this.userService.checkSignin(localStorage.getItem('username')).subscribe((res: any) => {
                    if(res.success == true) {
                        this.user = res.data;
                        this.detectChanges();
                    }
                })
            }
        })
    }
    detectChanges() {
        if (!this.cdr['destroyed']) this.cdr.detectChanges();
      }
}
