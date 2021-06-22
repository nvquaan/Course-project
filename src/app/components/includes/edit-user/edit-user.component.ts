import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
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
    data;
    constructor(
        private userService: UserService,
        private fb: FormBuilder,
        private toastrService: ToastrService,
        public dialogRef: MatDialogRef<EditUserComponent>,
        private dialog: MatDialog,
        @Inject(MAT_DIALOG_DATA) public dialogData: any,
        private cdr: ChangeDetectorRef) { }

    ngOnInit() {
        this.data = this.dialogData;
        this.userForm = this.fb.group({
            username: [this.data.username, Validators.compose([Validators.required])],
            fullname: [this.data.fullname, Validators.compose([Validators.required])],
            age: [this.data.age, Validators.compose([Validators.required])],
            gender: [this.data.gender, Validators.compose([Validators.required])],
            phone: [this.data.phone, Validators.compose([Validators.required])],
            oldPassword:[""],
            newPassword:[""],
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
                this.userService.editUser(formValue).subscribe((res: any) => {
                    if(res.success === true) {
                        this.toastrService.success(res.message);
                        this.dialogRef.close(true);
                    } else {
                        this.toastrService.error(res.message);
                    }
                })
            }
        })
        
    }
    onOpenChangePasswordForm() {
        this.isChangePassword = !this.isChangePassword;
        this.userForm.controls['oldPassword'].setValidators([Validators.required]);
        this.userForm.controls['newPassword'].setValidators([Validators.required]);
        this.userForm.updateValueAndValidity();
        this.detectChanges();
    }
    onClose(){
        this.dialogRef.close(false);
    }
    private detectChanges() {
        if (!this.cdr['destroyed']) {
            this.cdr.detectChanges();
        }
      }
}
