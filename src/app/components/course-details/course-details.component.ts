import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/service/movies.service';
import { ActivatedRoute, Params } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material';
import { AppCourseDialogComponent } from '../course-details/app-course-dialog/app-course-dialog.component';
import { CoursesService } from 'src/app/service/courses.service';
import { HttpParams } from '@angular/common/http';
import { ToastrService } from "ngx-toastr";

@Component({
    selector: 'app-course-details',
    templateUrl: './course-details.component.html',
    styleUrls: ['./course-details.component.scss'],
})
export class CourseDetailsComponent implements OnInit {
    public id: number = 460465;
    public video: boolean;
    movie: any;
    baseUrl = 'https://www.youtube.com/embed/';
    autoplay = '?rel=0;&autoplay=1&mute=0';
    relatedvideo: any;
    casts: any = [];
    backdrops: any = [];
    recomendMovies: any = [];
    responsiveOptions;
    currentRate = 5;

    constructor(
        private movieService: MoviesService,
        private router: ActivatedRoute,
        private sanitizer: DomSanitizer,
        private dialog: MatDialog,
        private courseSV: CoursesService,
        private toastrService: ToastrService,
    ) {
        this.responsiveOptions = [
            {
                breakpoint: '1024px',
                numVisible: 3,
                numScroll: 3
            },
            {
                breakpoint: '768px',
                numVisible: 2,
                numScroll: 2
            },
            {
                breakpoint: '560px',
                numVisible: 1,
                numScroll: 1
            }
        ];
    }
    slugCourse;
    course;
    ngOnInit() {
        this.router.params.subscribe((params: Params) => {
            this.slugCourse = params['slug'];
            this.getSingleMoviesVideos(this.id);
            this.getSingleMoviesDetails(this.id);
            this.getCast(this.id);
            this.getBackropsImages(this.id);
            this.getRecomendMovie(this.id);

            this.getSingleCourse(this.slugCourse);
            this.getAllLessonsOfCourse(this.slugCourse);
        });
    }

    getSingleCourse(slugCourse) {
        this.courseSV.getCourse(slugCourse).subscribe((res: any) => {
            this.course = res.data;
            this.currentRate = res.data.rate;
        })
    }
    lessons;
    getAllLessonsOfCourse(slugCourse){
        this.courseSV.getAllLessonsOfCourse(slugCourse).subscribe((res: any) => {
            this.lessons = res.data;
            console.log('data', res.data);
        })
    }
    onRateChange(rate){
        let params:HttpParams = new HttpParams();
        params = params.set('rate', rate+'');

        this.courseSV.updateCourse(this.slugCourse, params).subscribe((res: any) => {
            if(res.code == 200){
                this.toastrService.success('Vote thành công 👍👍');
            }
        })
    }

    getSingleMoviesDetails(id) {
        this.movieService.getMovie(id).subscribe((res: any) => {
            this.movie = res;
        });
    }

    getSingleMoviesVideos(id) {
        this.movieService.getMovieVideos(id).subscribe((res: any) => {
            if (res.results.length) {
                this.video = res.results[0];
                this.relatedvideo = res.results;
            }
        });
    }

    openDialogMovie(video): void {
        let a = {...video};
        a['imageUrl'] = this.sanitizer.bypassSecurityTrustResourceUrl(this.baseUrl + a.imageUrl + this.autoplay);
        this.dialog.open(AppCourseDialogComponent, {
            height: '600px',
            width: '900px',
            data: { video: a }
        });
    }

    getCast(id) {
        this.movieService.getMovieCredits(id).subscribe((res: any) => {
            this.casts = res.cast;
        });
    }

    getBackropsImages(id) {
        this.movieService.getBackdropsImages(id).subscribe((res: any) => {
            this.backdrops = res.backdrops;
        });
    }

    getRecomendMovie(id) {
        this.movieService.getRecomendMovies(id).subscribe((res: any) => {
            this.recomendMovies = res.results;
        });
    }

}

