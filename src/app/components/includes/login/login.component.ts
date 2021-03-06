import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/service/user.service';
import { ForgetComponent } from '../forget/forget.component';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    signInForm: FormGroup;
    constructor(
        private userService: UserService,
        private fb: FormBuilder,
        public dialogRef: MatDialogRef<LoginComponent>,
        private toastrService: ToastrService,
        private dialog: MatDialog,
        ) { }

    ngOnInit() {
        this.signInForm = this.fb.group({
            username: "",
            password:"",
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
                localStorage.setItem('username', res.data.username);
                localStorage.setItem('idUser', res.data.id);
                localStorage.setItem('wallet', res.data.wallet);
                localStorage.setItem('bought', JSON.stringify(res.data.courses));
                localStorage.setItem('fullinfo', JSON.stringify(res.data));
                let cart = {
                    username: res.data.username,
                    courses: [],
                }
                localStorage.setItem('cart', JSON.stringify(cart));
                const roles = res.data.roles;
                localStorage.setItem('roles', JSON.stringify(roles));
                this.dialogRef.close(true);
            }
            else {
                this.toastrService.error(res.message);
                this.signInForm.reset();
            }
        })
    }

    onClose(){
        this.dialogRef.close(false);
    }
    forgetPassword(){
        this.dialog.open(ForgetComponent, {
            height: '500px',
            width: '400px',
        })
    }
    
}
