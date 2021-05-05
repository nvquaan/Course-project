import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/service/user.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    username: any;
    password: any;
    constructor(private toastrService: ToastrService, private userService: UserService) { }

    ngOnInit() {
    }

    onClick() {
        let params: HttpParams = new HttpParams();
        params = params.set('username', this.username);
        params = params.set('password', this.password);

        this.userService.signin(params).subscribe((res:any) => {
            if (res.success == true) {

                this.toastrService.success('Đăng nhập thành công');
            }
        })
    }
}
