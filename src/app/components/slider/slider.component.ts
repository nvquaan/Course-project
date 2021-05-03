import { Component, OnInit } from '@angular/core';
import { trigger, transition, animate, style, state } from '@angular/animations';
import { MoviesService } from 'src/app/service/movies.service';
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
  // tslint:disable-next-line: variable-name
  movies_data: any;
  // tslint:disable-next-line: variable-name
  tv_shows: any;


  constructor(
    private movieService: MoviesService,
    private courseSV: CoursesService,
  ) { }

  ngOnInit() {
    this.getnowPlayingMovies(1);
    this.getAllHotCourses();
    this.sliderTimer();
  }

  getnowPlayingMovies(page: number) {
    this.movieService.getNowPlaying(page).pipe(delay(2000)).subscribe((res: any) => {
      this.movies_data = res.results;
    });
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
    }, 5000);
  }

}
