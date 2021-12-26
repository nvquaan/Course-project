import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {MatDialog} from '@angular/material';
import {AppCourseDialogComponent} from '../course-details/app-course-dialog/app-course-dialog.component';
import {CoursesService} from 'src/app/service/courses.service';
import {HttpParams} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {FormConfirmComponent} from '../includes/form-confirm/form-confirm.component';
import {delay} from 'rxjs/internal/operators/delay';
import {LoginComponent} from '../includes/login/login.component';

@Component({
    selector: 'app-course-details',
    templateUrl: './course-details.component.html',
    styleUrls: ['./course-details.component.scss'],
})
export class CourseDetailsComponent implements OnInit {
    movie: any;
    baseUrl = 'https://www.youtube.com/embed/';
    autoplay = '?rel=0;&autoplay=1&mute=0';
    backdrops: any = [];
    responsiveOptions;
    currentRate = 0;
    btnCart: number; // 1: da them vao gio 2: chua them 3: da mua
    bought: boolean;
    loader = true;

    constructor(
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
    course = null;

    ngOnInit() {
        this.router.params.subscribe((params: Params) => {
            this.loader = true;
            this.slugCourse = params['slug'];
            this.getSingleCourse(this.slugCourse);
            this.getAllLessonsOfCourse(this.slugCourse);
            this.getAllRatesOfCourse(this.slugCourse);
            this.getRecomendCourses();
        });
    }

    getSingleCourse(slugCourse) {
        this.courseSV.getCourse(slugCourse).pipe(delay(500)).subscribe((res: any) => {
            if (res.success == true) {
                this.course = res.data;
                //check xem khoa hoc nay da mua chua
                this.bought = this.checkBought();
                if (this.bought) {
                    this.btnCart = 3;
                } else {
                    this.checkCart();
                }
            }
        });
    }

    checkBought() {
        let bought = JSON.parse(localStorage.getItem('bought'));
        if (bought && bought.length > 0) {
            return bought.find(c => c.course._id == this.course._id);
        } else {
            return false;
        }
    }

    lessons = null;

    getAllLessonsOfCourse(slugCourse) {
        this.courseSV.getAllLessonsOfCourse(slugCourse).subscribe((res: any) => {
            if (res.success == true) {
                this.lessons = res.data;
            }
        });
    }

    rates = [];

    getAllRatesOfCourse(slugCourse) {
        this.courseSV.getAllRates(slugCourse).subscribe((res: any) => {
            if (res.success == true) {
                this.rates = res.data; //Lấy ra tất cả đánh giá của khoá Học
                let rateData = this.checkVoted(this.rates);
                console.log(rateData);
                this.currentRate = rateData.rate;
            }
        });
    }

    checkVoted(rates) { //Hàm check user này đã đánh giá bài học này chưa. Nếu rồi trả về data rate
        const idUser = localStorage.getItem('idUser');
        // -> Lặp qua data, tìm giá trị rate của user đang đăng nhập
        if (idUser) {
            let r = rates.find(rate => {
                return idUser == rate.user._id;
            });
            return r ? r : 0;
        } else {
            return 0;
        }
    }

    onRateChange(rate) {
        if (!rate) {
            return;
        }
        let params: HttpParams = new HttpParams();
        const idUser = localStorage.getItem('idUser');
        params = params.set('user', idUser);
        params = params.set('rate', rate + '');
        let rateData = this.checkVoted(this.rates);
        if (rateData) {
            this.dialog.open(FormConfirmComponent, {
                height: '600px',
                width: '900px',
                data: {
                    content: 'Bạn có muốn THAY ĐỔI vote?',
                    showTextArea: true
                }
            }).afterClosed().subscribe(res => {
                if (res) {
                    params = params.set('_id', rateData._id);
                    params = params.set('message', res);
                    this.courseSV.updateRateCourse(this.slugCourse, params).subscribe((res: any) => {
                        if (res.success == true) {
                            this.toastrService.success('Update vote thành công 👍👍');
                            window.location.reload();
                        } else {
                            this.toastrService.error(res.message);
                            if(res.message == 'Phiên đăng nhập hết hạn') {
                                setTimeout(() => {window.location.reload();}, 3000);
                            }
                        }
                    });
                }
            });
        } else {
            this.dialog.open(FormConfirmComponent, {
                height: '600px',
                width: '900px',
                data: {
                    content: 'Bạn có thể nhập nội dung đánh giá',
                    showTextArea: true
                }
            }).afterClosed().subscribe(res => {
                if (res) {
                    params = params.set('message', res);
                    this.courseSV.rateCourse(this.slugCourse, params).subscribe((res: any) => {
                        if (res.code == 400) {
                            this.toastrService.error('Bạn cần đăng nhập để thực hiện hành dộng này!!');
                        }
                        if (res.code == 200) {
                            this.toastrService.success('Vote thành công 👍👍');
                            window.location.reload();
                        } else {
                            this.toastrService.error(res.message);
                            if(res.message == 'Phiên đăng nhập hết hạn') {
                                setTimeout(() => {window.location.reload();}, 3000);
                            }
                        }
                    });
                }
            });
        }
    }

    deleteRate(id) {
        this.dialog.open(FormConfirmComponent, {
            height: '600px',
            width: '900px',
            data: {
                content: 'Bạn có muốn xoá đánh giá này? Điều này không thể khôi phục',
                showTextArea: false
            }
        }).afterClosed().subscribe(res => {
            if (res) {
                this.courseSV.deleteRate(this.slugCourse, id).subscribe((res: any) => {
                    if (!res.success && res.code === 400) {
                        this.toastrService.error('Bạn không có quyền thực hiện hành động này 😒');

                    }
                    if (res.success == true) {
                        this.toastrService.success('Xoá vote thành công 👌');
                        this.getAllRatesOfCourse(this.slugCourse);
                    }
                });
            }
        });
    }

    checkCart() {
        let cart = JSON.parse(localStorage.getItem('cart'));
        if (cart) {
            let course = this.course;
            let index = cart.courses.findIndex(x => x._id == course._id);
            if (index >= 0) {
                this.btnCart = 1;
            } else {
                this.btnCart = 2;
            }
        }
    }

    onAddToCart() {
        let username = localStorage.getItem('username');
        if (username) {
            let course = this.course;
            let cart = JSON.parse(localStorage.getItem('cart'));
            cart.username = username;
            cart.courses.push(course);
            localStorage.setItem('cart', JSON.stringify(cart));
            this.courseSV.isAddedToCart.next(true);
            this.btnCart = 1;
        } else {
            this.toastrService.error('Bạn cần đăng nhập để thực hiện hành dộng này!!');
        }

    }

    onRemoveFromCart() {
        let cart = JSON.parse(localStorage.getItem('cart'));
        if (cart) {
            let course = this.course;
            let index = cart.courses.findIndex(x => x._id == course._id);
            cart.courses.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            this.courseSV.isAddedToCart.next(false);
            this.btnCart = 2;
        }
    }

    recomendCourses = null;

    getRecomendCourses() {
        this.courseSV.getAllCourses().pipe(delay(500)).subscribe((res: any) => {
            if (res.success == true) {
                this.recomendCourses = res['data'];
                this.loader = false;
            }
        });
    }


    openDialogLesson(video): void {
        let a = {...video};
        a['imageUrl'] = this.sanitizer.bypassSecurityTrustResourceUrl(this.baseUrl + a.imageUrl + this.autoplay);
        this.dialog.open(AppCourseDialogComponent, {
            height: '600px',
            width: '900px',
            data: {videoUrl: a['imageUrl']}
        });
    }

    openDialogTrailerCourse(trailerUrl): void {
        let a = this.sanitizer.bypassSecurityTrustResourceUrl(this.baseUrl + trailerUrl + this.autoplay);
        this.dialog.open(AppCourseDialogComponent, {
            height: '600px',
            width: '900px',
            data: {videoUrl: a}
        });
    }
}

