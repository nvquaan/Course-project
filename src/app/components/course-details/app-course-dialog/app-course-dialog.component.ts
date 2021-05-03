import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-app-movie-dialog',
  templateUrl: './app-course-dialog.component.html',
  styleUrls: ['./app-course-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppCourseDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AppCourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  closeDialog() {
    this.dialogRef.close('movie');
  }

  ngOnInit() {
  }

}
