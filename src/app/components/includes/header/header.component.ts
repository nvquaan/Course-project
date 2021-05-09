import { Component, OnInit, Input } from '@angular/core';
import { MoviesService } from 'src/app/service/movies.service';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/service/user.service';
import { MatDialog } from '@angular/material';
import { RegisterComponent } from '../register/register.component';
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    searchBarUp;
    leftSidebar;
    label: string;

    constructor(private userService: UserService, private toastrService: ToastrService, private dialog: MatDialog,
    ) {
        this.userService.checkSignin().subscribe((res: any) => {
            if (res.success == true) {
                this.label = 'Đăng xuất'
            }
            else {
                this.label = 'Đăng nhập';
                localStorage.clear();
            }
        })
    }

    ngOnInit() {

    }

    onclick() {
        this.userService.checkSignin().subscribe((res: any) => {
            if (res.success == true) {
                localStorage.clear();
                this.toastrService.success('Bạn đã đăng xuất 😥😥');
                this.label = 'Đăng nhập';
                window.location.reload();
            }
            else {
                this.dialog.open(LoginComponent, {
                    height: '600px',
                    width: '900px',
                })
                this.userService.isLoggedIn.subscribe(res => {
                    if (res) {
                        this.dialog.closeAll();
                        this.label = 'Đăng xuất';
                        window.location.reload();

                    }
                })
            }
        })
    }

    onClickSignUp() {
        this.dialog.open(RegisterComponent, {
            height: '600px',
            width: '900px',
        })
        this.userService.isLoggedIn.subscribe(res => {
            if (res) {
                this.dialog.closeAll();
                // this.label = 'Đăng xuất'
            }
        })
    }

}


