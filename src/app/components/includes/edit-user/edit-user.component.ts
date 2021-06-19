import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/service/user.service';
import { FormConfirmComponent } from '../form-confirm/form-confirm.component';

@Component({
    selector: 'app-edit-user',
    templateUrl: './edit-user.component.html',
    styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
    userForm: FormGroup;
    isChangePassword: boolean = false;
    constructor(
        private userService: UserService,
        private fb: FormBuilder,
        private toastrService: ToastrService,
        public dialogRef: MatDialogRef<EditUserComponent>,
        private dialog: MatDialog) { }

    ngOnInit() {
        this.userForm = this.fb.group({
            fullname: "",
            age: "",
            gender: "",
            phone: "",
            oldPassword:"",
            newPassword:"",
        });
    }

    onClick(formValue){
        this.dialog.open(FormConfirmComponent, {
            height: '600px',
            width: '900px',
            data: {
                content: 'Bạn có chắc chắn muốn thay đổi thông tin?',
                showTextArea: false,
            }
        }).afterClosed().subscribe(res => {
            if(res) {
                console.log(formValue);
                this.userService.editUser(formValue).subscribe()
            }
        })
        
    }
    onOpenChangePasswordForm() {
        this.isChangePassword = !this.isChangePassword;
    }
    onClose(){
        this.dialogRef.close(false);
    }
}
