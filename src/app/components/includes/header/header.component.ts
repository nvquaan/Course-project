import { Component, OnInit, Input } from '@angular/core';
import { MoviesService } from 'src/app/service/movies.service';
import { Router } from '@angular/router';
import { NgbModal, NgbModalOptions  } from '@ng-bootstrap/ng-bootstrap'
import { LoginComponent } from '../login/login.component';
import { LoginService } from '../_services/login.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  searchBarUp;
  leftSidebar;

  

  constructor(private modalService: NgbModal, private loginService: LoginService) { }

  ngOnInit() {
  }

  openFormLogin(){
      let options: NgbModalOptions = {
        windowClass: 'my-login-form'
      }
      let formRef = this.modalService.open(LoginComponent, options);
      this.loginService.isLoggedIn.subscribe(res => {
          if(res){
              formRef.close();
          }
      })
      
  }

}


