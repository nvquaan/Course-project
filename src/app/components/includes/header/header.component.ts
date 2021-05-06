import { Component, OnInit, Input } from '@angular/core';
import { MoviesService } from 'src/app/service/movies.service';
import { Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap'
import { LoginComponent } from '../login/login.component';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/service/user.service';
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    searchBarUp;
    leftSidebar;
    label: string;

    constructor(private modalService: NgbModal, private userService: UserService, private toastrService: ToastrService) {
        this.userService.checkSignin().subscribe((res: any) => {
            if (res.success == true) {
                this.label = 'Đăng xuất'
            }
            else {
                this.label = 'Đăng nhập';
                localStorage.removeItem('x-access-token');
            }
        })
    }

    ngOnInit() {

    }

    onclick() {
        this.userService.checkSignin().subscribe((res: any) => {
            if (res.success == true) {
                localStorage.removeItem('x-access-token');
                this.toastrService.success('Bạn đã đăng xuất 😥😥');
                this.label = 'Đăng nhập';
            }
            else {
                let options: NgbModalOptions = {
                    windowClass: 'my-login-form'
                }
                let formRef = this.modalService.open(LoginComponent, options);
                this.userService.isLoggedIn.subscribe(res => {
                    if (res) {
                        formRef.close();
                        this.label = 'Đăng xuất'
                    }
                })
            }
        })
    }

}


