import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-form-confirm',
    templateUrl: './form-confirm.component.html',
    styleUrls: ['./form-confirm.component.scss']
})
export class FormConfirmComponent implements OnInit {
    message: string = '';
    constructor(
        public dialogRef: MatDialogRef<FormConfirmComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    ngOnInit() {
    }
    closeDialog() {
        this.dialogRef.close(false);
    }
    confirmDialog(){
        this.dialogRef.close(this.message.trim() || 'None');
    }
}
