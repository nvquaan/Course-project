import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs/internal/operators/delay';
import { CoursesService } from 'src/app/service/courses.service';

@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
    responsiveOptions;
    loader = true;
    totalResults: any;
    searchStr: string;
    categories = [];
    categorySlug;
    constructor(private courseSV: CoursesService, private router: Router) {
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
    }
    start = 0; end = 6;

    getAllCategories(page = 1) {
        this.courseSV.getAllCategories().pipe(delay(800)).subscribe((res: any) => {
            if (res.success == true && res.data.length > 0) {
                this.categories = res.data;
                this.totalResults = res.data.length;
                this.end = page * 6;
                this.start = this.end - 6
                this.loader = false;
            }
        })
    }

    changePage(event) {
        this.loader = true;
        this.getAllCategories(event.pageIndex + 1);
    }

    searchCategories(page = 1) {
        this.loader = true;
        if (this.searchStr && this.searchStr.trim()) {
            this.courseSV.searchCategories({ searchStr: this.searchStr }).pipe(delay(800)).subscribe((res: any) => {
                if (res.success == true) {
                    this.categories = res.data;
                    this.totalResults = this.categories.length;
                    this.end = page * 6;
                    this.start = this.end - 6
                    this.loader = false;
                }
            });
        }
        else {
            this.getAllCategories();
        }
    }
    // searchCourses(page = 1) {
    //     this.loader = true;
    //     if (this.searchStr && this.searchStr.trim()) {
    //         this.courseSV.searchCourses({ searchStr: this.searchStr }).pipe(delay(800)).subscribe((res: any) => {
    //             if (res.success == true) {
    //                 this.listCourses = res.data;
    //                 this.totalResults = this.listCourses.length;
    //                 this.end = page * 6;
    //                 this.start = this.end - 6
    //                 this.loader = false;
    //             }
    //         });
    //     }
    //     else {
    //         this.getAllHotCourses();
    //     }
    // }

}
