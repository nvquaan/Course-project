import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/service/movies.service';
import { ActivatedRoute, Params } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material';
import { AppCourseDialogComponent } from '../course-details/app-course-dialog/app-course-dialog.component';
import { CoursesService } from 'src/app/service/courses.service';
import { HttpParams } from '@angular/common/http';
import { ToastrService } from "ngx-toastr";
import { FormConfirmComponent } from '../includes/form-confirm/form-confirm.component';

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
    currentRate = 0;

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
            this.getAllRatesOfCourse(this.slugCourse);
        });
    }

    getSingleCourse(slugCourse) {
        this.courseSV.getCourse(slugCourse).subscribe((res: any) => {
            if (res.success == true) {
                this.course = res.data;
            }
        })
    }
    lessons;
    getAllLessonsOfCourse(slugCourse) {
        this.courseSV.getAllLessonsOfCourse(slugCourse).subscribe((res: any) => {
            if (res.success == true) {
                this.lessons = res.data;
            }
        })
    }
    rates = [];
    getAllRatesOfCourse(slugCourse) {
        this.courseSV.getAllRates(slugCourse).subscribe((res: any) => {
            if (res.success == true) {
                this.rates = res.data; //Lấy ra tất cả đánh giá của khoá Học
                let rateData = this.checkVoted(this.rates);
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
        if(!rate)
        return;
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
                    content: 'Bạn có muốn thay đổi vote?',
                    showTextArea: true
                }
            }).afterClosed().subscribe(res => {
                if (res) {
                    params = params.set('_id', rateData._id);
                    params = params.set('message', res);
                    this.courseSV.updateRateCourse(this.slugCourse, params).subscribe((res: any) => {
                        if(res.success==true){
                            this.toastrService.success('Update vote thành công 👍👍');
                            window.location.reload();
                        }
                        else{
                            this.toastrService.error('Có lỗi xảy ra 😥');
                        }
                    })
                }
            })
        }
        else {
            this.dialog.open(FormConfirmComponent, {
                height: '600px',
                width: '900px',
                data: {
                    content: 'Bạn có thể nhập nội dung đánh giá',
                    showTextArea: true
                }
            }).afterClosed().subscribe(res => {
                if(res){
                    params = params.set('message', res);
                    this.courseSV.rateCourse(this.slugCourse, params).subscribe((res: any) => {
                        if (res.code == 400) {
                            this.toastrService.error('Bạn cần đăng nhập để thực hiện hành dộng này!!');
                        }
                        if (res.code == 200) {
                            this.toastrService.success('Vote thành công 👍👍');
                            window.location.reload();
                        }
                    })
                }
            })
        }
    }
    deleteRate(id){
        this.courseSV.deleteRate(this.slugCourse, id).subscribe((res: any) => {
            if(!res.success && res.code === 400) {
                this.toastrService.error('Bạn không có quyền thực hiện hành động này 😒');

            }
            if(res.success == true){
                this.toastrService.success('Xoá vote thành công 👌');
                this.getAllRatesOfCourse(this.slugCourse);
            }
        });

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
        let a = { ...video };
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

