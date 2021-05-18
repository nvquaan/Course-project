import { Component, OnInit } from '@angular/core';
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

    constructor(private courseSV: CoursesService) {
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
        this.getAllHotCourses();
    }
    listCourses = [];
    start = 0; end = 6;
    getAllHotCourses(page = 1) {
        this.courseSV.getAllHotCourses().pipe(delay(800)).subscribe((res: any) => {
            if (res.success == true && res.data.length > 0) {
                this.listCourses = res['data'];
                this.totalResults = this.listCourses.length;
                this.end = page * 6;
                this.start = this.end - 6
                this.loader = false;
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

}
