import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/service/user.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    signUpForm: FormGroup;
    wasValidated: boolean = false;
    constructor(
        private userService: UserService,
        private fb: FormBuilder,
        private toastrService: ToastrService,
        public dialogRef: MatDialogRef<RegisterComponent>,) { }

    ngOnInit() {
        this.signUpForm = this.fb.group({
            username: ["", Validators.required],
            email: ["", Validators.required],
            fullname: ["", Validators.required],
            age: ["", Validators.required],
            gender: ["male", Validators.required],
            phone: ["", Validators.required],
            password:["", Validators.required],
        });
    }

    onClick(formValue){
        console.log(formValue)
        this.wasValidated = true;
        if(this.signUpForm.invalid) {
            return this.toastrService.error("Vui lòng nhập đầy đủ thông tin");
        }
        if(formValue.password.length < 6){
            return this.toastrService.error("Mật khẩu phải chứa ít nhất 6 ký tự");
        }
        let params = formValue;
        this.userService.signup(params).subscribe((res:any) => {
            if (res.success == true) {
                this.dialogRef.close(true);
            }
            else {
                this.toastrService.error(res.message);
            }
        })
    }

    onClose(){
        this.dialogRef.close(false);
    }
}
