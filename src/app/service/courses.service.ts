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
  public getCourse(params?: any){
    return this.get(this.apiURL + '/courses/' + params);
  }

// Lấy các danh mục khoá học
  public getAllCategories(params?: any){
    return this.get(this.apiURL + '/categories', params);
  }
}