import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseDetailsRoutingModule } from './course-details-routing.module';
import { CourseDetailsComponent } from './course-details.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule, MatIconModule } from '@angular/material';
import { AppCourseDialogComponent } from './app-course-dialog/app-course-dialog.component';
import { CarouselModule } from 'primeng/carousel';
import { PipeModule } from 'src/app/pipe/pipe.module';
import { NgbRatingModule} from '@ng-bootstrap/ng-bootstrap';
import { CommentComponent } from './comment/comment.component';
import { SkeletonModule } from 'src/app/shared/skeleton/skeleton.module';
@NgModule({
  declarations: [
    CourseDetailsComponent,
    AppCourseDialogComponent,
    CommentComponent
  ],
  entryComponents: [
    AppCourseDialogComponent
  ],
  imports: [
    CommonModule,
    CourseDetailsRoutingModule,
    PipeModule,
    MatTabsModule,
    MatDialogModule,
    MatIconModule,
    CarouselModule,
    NgbRatingModule,
    SkeletonModule
  ],

})
export class CourseDetailsModule { }
