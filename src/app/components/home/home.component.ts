import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { MoviesService } from "src/app/service/movies.service";
import { TvService } from "src/app/service/tv.service";
import { delay } from "rxjs/internal/operators/delay";
import { CoursesService } from "../../service/courses.service";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "src/app/service/user.service";
import { ToastrService } from "ngx-toastr";
@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
    nowPlaying: any;
    tvShows: any;
    responsiveOptions;
    loader = true;

    constructor(
        private movies: MoviesService,
        private tv: TvService,
        public courseSV: CoursesService, 
        private activedRoute: ActivatedRoute,
        public userService: UserService, 
        private toastrService: ToastrService, 
        private router: Router
    ) {
        this.responsiveOptions = [
            {
                breakpoint: "1024px",
                numVisible: 3,
                numScroll: 3,
            },
            {
                breakpoint: "768px",
                numVisible: 2,
                numScroll: 2,
            },
            {
                breakpoint: "560px",
                numVisible: 1,
                numScroll: 1,
            },
        ];
    }
    ngOnInit() {
        // this.trendingMovies(1);
        // this.tvShow(1);
        this.getAllCategories();
        this.getAllHotCourses();
        this.activedRoute.queryParams.subscribe(queryParams => {
            if(queryParams.confirmToken){
                this.userService.verifySignup({confirmToken:queryParams.confirmToken}).subscribe((res: any) => {
                    if(res.success === true){
                        this.toastrService.success('Xác nhận email thành công');
                        this.router.navigate(['/']);
                    }
                })
            }
        })
    }
    trendingMovies(page: number) {
        this.movies
            .getNowPlaying(page)
            .pipe(delay(2000))
            .subscribe((res: any) => {
                this.nowPlaying = res.results;
                this.loader = false;
            });
        // this.courseSV.getAllCategories().subscribe(res => {
        //   this.nowPlaying = res.data;
        //   res.data.forEach(d => console.log(d.name));
        // })
    }

    tvShow(page: number) {
        this.tv
            .getTvOnTheAir(page)
            .pipe(delay(2000))
            .subscribe((res: any) => {
                this.tvShows = res.results;
                this.loader = false;
            });
    }
    listCategories;
    getAllCategories() {
        this.courseSV.getAllCategories().subscribe(res => {
            this.listCategories = res['data'];
            this.loader = false;
        })
    }

    listHotCourses;
    getAllHotCourses() {
        this.courseSV.getAllHotCourses().subscribe((res: any) => {
            if (res.success == true) {
                this.listHotCourses = res['data'];
                this.loader = false;
            }
        })
    }
}
