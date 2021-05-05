import { Component, OnInit, Input } from '@angular/core';
import { MoviesService } from 'src/app/service/movies.service';
import { Router } from '@angular/router';
import { NgbModal, NgbModalOptions  } from '@ng-bootstrap/ng-bootstrap'
import { LoginComponent } from '../login/login.component';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  searchBarUp;
  leftSidebar;

  

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  openFormLogin(){
      let options: NgbModalOptions = {
        windowClass: 'my-login-form'
      }
      this.modalService.open(LoginComponent, options);
  }

}


