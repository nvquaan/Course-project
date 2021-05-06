import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/service/user.service';
import { LoginService } from '../_services/login.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    signInForm: FormGroup;
    constructor(
        private toastrService: ToastrService,
        private userService: UserService,
        private fb: FormBuilder,
        private modalService: NgbModal,
        private loginService: LoginService,
        ) { }

    ngOnInit() {
        this.signInForm = this.fb.group({
            username: "",
            password:"",
            rememberMe: true
        })
    }

    onClick(formValue) {
        let params: HttpParams = new HttpParams();
        params = params.set('username', formValue.username);
        params = params.set('password', formValue.password);

        this.userService.signin(params).subscribe((res:any) => {
            if (res.success == true) {
                const accessToken = res.data.accessToken;
                localStorage.setItem('x-access-token', accessToken);
                this.toastrService.success('Đăng nhập thành công');
                this.loginService.isLoggedIn.next(true);
            }
            
        })
    }
}
