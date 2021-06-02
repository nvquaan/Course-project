import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
    constructor(
        private userService: UserService,
        private fb: FormBuilder,
        private toastrService: ToastrService,
        public dialogRef: MatDialogRef<RegisterComponent>,) { }

    ngOnInit() {
        this.signUpForm = this.fb.group({
            username: "",
            email: "",
            fullname: "",
            age: "",
            gender: "",
            phone: "",
            password:"",
        });
    }

    onClick(formValue){
        console.log(formValue);
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
