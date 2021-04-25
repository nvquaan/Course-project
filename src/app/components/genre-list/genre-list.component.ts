import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/service/movies.service';
import { delay } from 'rxjs/internal/operators/delay';
import {CoursesService} from '../../service/courses.service';


@Component({
  selector: 'app-genre-list',
  templateUrl: './genre-list.component.html',
  styleUrls: ['./genre-list.component.scss']
})
export class GenreListComponent implements OnInit {

  genreslist: any;
  loader = true;

  constructor(
    private _movie: MoviesService,
    private courseSV: CoursesService
  ) { }

  ngOnInit() {
    this.MovieGenre();
  }

  MovieGenre() {
    this._movie.getGenres().pipe(delay(2000)).subscribe((res: any) => {
      this.genreslist = res.genres;
      console.log(typeof this.genreslist);
      this.loader = false;
    });
  // this.courseSV.getAllCategories().subscribe(res => {
  //   this.genreslist = [...res.data];
  //   console.log(this.genreslist);
  //   this.loader = false;
  // });
  }

}
