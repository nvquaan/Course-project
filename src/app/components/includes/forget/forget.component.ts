import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/service/user.service';

@Component({
    selector: 'app-forget',
    templateUrl: './forget.component.html',
    styleUrls: ['./forget.component.scss']
})
export class ForgetComponent implements OnInit {
    forgetForm: FormGroup;
    step;
    constructor(
        private userService: UserService,
        private fb: FormBuilder,
        public dialogRef: MatDialogRef<ForgetComponent>,
        private toastrService: ToastrService,
    ) { }

    ngOnInit() {
        this.step = 1;
        this.forgetForm = this.fb.group({
            username: "",
            verifyNumber: '',
            newPassword: '',
            confirmPassword: '',
        });

    }

    onClickGetVerifyNumber(formValue) {
        if(formValue.newPassword.length < 6){
            return this.toastrService.error("Mật khẩu phải chứa ít nhất 6 ký tự");
        }
        const param = {
            ...formValue,
            step: 1,
        }
        this.userService.forgetPassword(param).subscribe((res: any) => {
            if (res.success == true) {
                this.toastrService.success(res.message);
                this.step = 2;
            }
            else {
                this.toastrService.error(res.message);
            }
        })
    }

    onClickConfirmNumber(formValue) {
        const param = {
            ...formValue,
            step: 2,
        }
        this.userService.forgetPassword(param).subscribe((res: any) => {
            if (res.success == true) {
                this.toastrService.success(res.message);
                this.step = 3;
            }
            else {
                this.toastrService.error(res.message);
            }
        })
    }

    onClickSetNewPassword(formValue) {
        if (formValue.newPassword !== formValue.confirmPassword) {
            return this.toastrService.error('2 mật khẩu phải giống nhau 😒');
        }
        if (!formValue.newPassword && !formValue.confirmPassword) {
            return this.toastrService.error('Mật khẩu mới không hợp lệ 😒');
        }
        const param = {
            ...formValue,
            step: 3,
        }
        this.userService.forgetPassword(param).subscribe((res: any) => {
            if (res.success == true) {
                this.toastrService.success(res.message);
                this.dialogRef.close(true);
            }
            else {
                this.toastrService.error(res.message);
            }
        })
    }
    onClose() {
        this.dialogRef.close(false);
    }
}
