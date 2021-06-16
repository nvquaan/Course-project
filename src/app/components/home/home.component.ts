import { Component, OnInit, ViewEncapsulation } from "@angular/core";
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
    responsiveOptions;
    loader = true;

    constructor(
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
        //test
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
