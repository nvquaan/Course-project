import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs/internal/operators/delay';
import { CoursesService } from 'src/app/service/courses.service';

@Component({
    selector: 'app-courses',
    templateUrl: './courses.component.html',
    styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
    topRated: any;
    responsiveOptions;
    loader = true;
    totalResults: any;
    searchStr: string;
    categories = [];
    categorySlug;
    constructor(private courseSV: CoursesService, private activatedRoute: ActivatedRoute, private router: Router) {
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

    ngOnInit() {
        this.getAllCategories();
        this.activatedRoute.queryParams.subscribe(params => {
            if(params.category){
                this.categorySlug = params.category
                this.getCoursesByCategorySlug(this.categorySlug);
            }
            else {
                this.getAllHotCourses();
            }
        })
    }
    listCourses = [];
    start = 0; end = 20;
    getAllHotCourses(page = 1) {
        this.courseSV.getAllHotCourses().pipe(delay(800)).subscribe((res: any) => {
            if (res.success == true && res.data.length > 0) {
                this.listCourses = res['data'];
                this.totalResults = this.listCourses.length;
                this.end = page * 20;
                this.start = this.end - 20
                this.loader = false;
            }
        })
    }

    getAllCategories() {
        this.courseSV.getAllCategories().subscribe((res: any) => {
            if (res.success == true && res.data.length > 0) {
                this.categories = res.data;
            }
        })
    }

    changePage(event) {
        this.loader = true;
        this.getAllHotCourses(event.pageIndex + 1);
    }

    searchCourses(page = 1) {
        this.loader = true;
        if (this.searchStr && this.searchStr.trim()) {
            this.courseSV.searchCourses({ searchStr: this.searchStr }).pipe(delay(800)).subscribe((res: any) => {
                if (res.success == true) {
                    this.listCourses = res.data;
                    this.totalResults = this.listCourses.length;
                    this.end = page * 6;
                    this.start = this.end - 6
                    this.loader = false;
                }
            });
        }
        else {
            this.getAllHotCourses();
        }
    }

    filterCourses(value) {

        if (!value) {
            this.router.navigate(['/courses']);
        } else {
            this.router.navigate(['/courses'], {queryParams: {category: value}});
        }
    }

    getCoursesByCategorySlug(slug) {
        this.loader = true;
        this.courseSV.getAllCoursesOfCategory(slug).pipe(delay(800)).subscribe((res: any) => {
            if (res.success == true) {
                this.listCourses = res.data;
                this.totalResults = this.listCourses.length;
                this.loader = false;
            }
        });
    }
}
