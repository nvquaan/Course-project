import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { ApiService } from './api.service';
@Injectable({
  providedIn: 'root'
})
export class CoursesService extends  ApiService{
  apiURL: string = 'http://localhost:5000/api';

  //Lấy các khoá học
  public getAllCourses(params?: any){
    return this.get(this.apiURL + '/courses', params);
  }
  //Lấy các khoá học đã xoá
  public getAllDeletedCourses(params?: any){
    return this.get(this.apiURL + '/me/trash/courses', params);
  }
  //Lấy 1 khoá học
  public getCourse(slug?: any){
    return this.get(this.apiURL + '/courses/' + slug);
  }
  //Update 1 khoa hoc
  public updateCourse(slug:any, params?: any){
    return this.put(this.apiURL + '/courses/' + slug, params);
  }

// Lấy các danh mục khoá học
  public getAllCategories(params?: any){
    return this.get(this.apiURL + '/categories', params);
  }

  //Lấy các bài học của một khoá Học
  public getAllLessonsOfCourse(slug?: any){
      return this.get(this.apiURL + '/courses/' + slug + '/lessons');
  }
}
