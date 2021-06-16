import { Component, OnInit } from '@angular/core';
import { trigger, transition, animate, style, state } from '@angular/animations';
import { CoursesService } from 'src/app/service/courses.service';
import { delay } from 'rxjs/internal/operators/delay';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  animations: [
    trigger('fade', [
      transition('void => *', [style({ opacity: 0 }), animate('300ms', style({ opacity: 1 }))]),
      transition('* => void', [style({ opacity: 1 }), animate('300ms', style({ opacity: 0 }))]),
    ])
  ]
})
export class SliderComponent implements OnInit {
  current = 0;
  constructor(
    private courseSV: CoursesService,
  ) { }

  ngOnInit() {
    this.getAllHotCourses();
    this.sliderTimer();
  }

  courses_data;
  getAllHotCourses(){
      this.courseSV.getAllCourses().subscribe((res: any) => {
          this.courses_data = res.data;
      })
  }
  sliderTimer() {
    setInterval(() => {
      this.current = ++this.current % this.courses_data.length;
    }, 3000);
  }

}
