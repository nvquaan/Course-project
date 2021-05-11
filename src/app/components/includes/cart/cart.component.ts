import { Component, OnInit } from '@angular/core';
import { CoursesService } from 'src/app/service/courses.service';
@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

    constructor(private courseSV: CoursesService) { }
    courses = [];
    ngOnInit() {
        this.getCourses();
    }

    getCourses() {
        let c = JSON.parse(localStorage.getItem('cart'));
        if (c && c.courses.length > 0) {
            this.courses = c.courses;
        }
        else {
            this.courses = [];
        }
    }
    removeCourse(id) {
        let cart = JSON.parse(localStorage.getItem('cart'));
        if (cart && cart.courses.length > 0) {
            let index = cart.courses.findIndex(c => c._id == id);
            cart.courses.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            this.courseSV.isAddedToCart.next(false);
            this.getCourses();
        }
    }
}
