import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CoursesService } from 'src/app/service/courses.service';
import { UserService } from 'src/app/service/user.service';
import * as moment from 'moment';
@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

    constructor(private courseSV: CoursesService, private userService: UserService, private toastrService: ToastrService) { }
    courses = [];
    total;
    wallet;
    ngOnInit() {
        this.getCourses();
        this.wallet = +localStorage.getItem('wallet');
        console.log(this.wallet);
    }

    getCourses() {
        let c = JSON.parse(localStorage.getItem('cart'));
        if (c && c.courses.length > 0) {
            this.courses = c.courses;
            this.total = this.courses.reduce((a, b) => a + b.cost, 0);
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

    onClickBuy() {
        if (this.wallet < this.total) {
            this.toastrService.error('Bạn không đủ tiền để mua 😥');
        }
        else {
            let date = moment(new Date()).format('DD/MM/YYYY');
            let coursesId = this.courses.map(c => c._id);
            let params = {
                coursesId: coursesId,
                total: this.total,
                username: localStorage.getItem('username'),
                date: date
            };
            this.userService.buyCourses(params).subscribe((res: any) => {
                if (res.success == true) {
                    this.toastrService.success('Mua khoá học thành công');
                    this.userService.wallet.next(res.data.wallet);
                    let c = JSON.parse(localStorage.getItem('cart'));
                    c.courses = [];
                    localStorage.setItem('cart', JSON.stringify(c));
                    this.getCourses();
                    window.location.reload();
                }
            })
        }
    }
}
