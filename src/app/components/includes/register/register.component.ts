import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/service/user.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    signUpForm: FormGroup;
    constructor(
        private toastrService: ToastrService,
        private userService: UserService,
        private fb: FormBuilder,) { }

    ngOnInit() {
        this.signUpForm = this.fb.group({
            username: "",
            email: "",
            password:"",
            rememberMe: true,
        });
    }

    onClick(formValue){
        let params: HttpParams = new HttpParams();
        params = params.set('username', formValue.username);
        params = params.set('email', formValue.email);
        params = params.set('password', formValue.password);

        this.userService.signup(params).subscribe((res:any) => {
            if (res.success == true) {
                this.toastrService.success('Đăng ký thành công 😍👌');
                this.userService.isLoggedIn.next(true);
            }
            
        })
    }
}
