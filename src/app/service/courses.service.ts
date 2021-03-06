import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ApiService } from './api.service';
@Injectable({
    providedIn: 'root'
})
export class CoursesService extends ApiService {
    apiURL: string = 'http://localhost:5008/api';
    isAddedToCart: Subject<boolean> = new Subject();
    //Lấy các khoá học
    public getAllCourses(params?: any) {
        return this.get(this.apiURL + '/courses', params);
    }
    //Lấy các khoá học HOT
    public getAllHotCourses(params?: any) {
        return this.get(this.apiURL + '/courses/hot', params);
    }

    //Tìm kiếm khoá Học
    public searchCourses(data?: any) {
        return this.post(this.apiURL + '/courses/search', data);
    }
    //Lấy các khoá học đã xoá
    public getAllDeletedCourses(params?: any) {
        return this.get(this.apiURL + '/me/trash/courses', params);
    }
    //Lấy 1 khoá học
    public getCourse(slug?: any) {
        return this.get(this.apiURL + '/courses/' + slug);
    }
    //Rate 1 khoa hoc -> slug cua khoa hoc
    public rateCourse(slug: any, data?: any) {
        return this.put(this.apiURL + '/courses/rate/' + slug, data);
    }
    //Update rate 1 khoa hoc
    public updateRateCourse(slug: any, data?: any) {
        return this.put(this.apiURL + '/courses/rate-edit/' + slug, data);
    }
    //Lấy tất cả đánh giá của khoá Học
    public getAllRates(slug: any, params?: any) {
        return this.get(this.apiURL + '/courses/rate/' + slug, params);
    }
    //Xoá đánh giá khoá học (chỉ mod và admin)
    public deleteRate(slug: any, id: any) {
        return this.delete(this.apiURL + '/courses/rate/' + slug + '/' + id);
    }
    // Lấy các danh mục khoá học
    public getAllCategories(params?: any) {
        return this.get(this.apiURL + '/categories', params);
    }
    //Tìm kiếm danh mục
    public searchCategories(data?: any) {
        return this.post(this.apiURL + '/categories/search', data);
    }
    //Lấy các khoá học của danh mục
    public getAllCoursesOfCategory(slug?: any) {
        return this.get(this.apiURL + '/categories/' + slug + '/courses');
    }
    //Lấy các bài học của một khoá Học
    public getAllLessonsOfCourse(slug?: any) {
        return this.get(this.apiURL + '/courses/' + slug + '/lessons');
    }
}
