import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/service/user.service';

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
        ) { }

    ngOnInit() {
        this.signInForm = this.fb.group({
            username: "",
            password:"",
            rememberMe: true
        });
        
    }

    onClick(formValue) {
        let params: HttpParams = new HttpParams();
        params = params.set('username', formValue.username);
        params = params.set('password', formValue.password);

        this.userService.signin(params).subscribe((res:any) => {
            if (res.success == true) {
                const accessToken = res.data.accessToken;
                localStorage.setItem('x-access-token', accessToken);
                this.toastrService.success('Đăng nhập thành công 😍👌');
                this.userService.isLoggedIn.next(true);
            }
            
        })
    }

    
}
