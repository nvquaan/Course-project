import { Component, OnInit, Input } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/service/user.service';
import { MatDialog } from '@angular/material';
import { RegisterComponent } from '../register/register.component';
import { CoursesService } from 'src/app/service/courses.service';
import { HttpParams } from '@angular/common/http';
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    searchBarUp;
    leftSidebar;
    isLoggedIn;
    countCart = 0;
    wallet;
    constructor(private userService: UserService, private toastrService: ToastrService, private dialog: MatDialog, private courseSV: CoursesService,
    ) {

    }

    ngOnInit() {
        this.userService.checkSignin(localStorage.getItem('username')).subscribe((res: any) => {
            if (res.success == true) {
                this.isLoggedIn = true;
                this.wallet = res.data.wallet;
                localStorage.setItem('wallet', this.wallet);
                localStorage.setItem('bought', JSON.stringify(res.data.courses));

            }
            else {
                this.isLoggedIn = false;
                localStorage.clear();
            }
        });
        this.checkCart();
        this.courseSV.isAddedToCart.subscribe((res: any) => {
            if (res) {
                this.countCart++;
            } else {
                this.countCart--;
            }
        })
        this.userService.wallet.subscribe(res => {
            this.wallet = res;
            localStorage.setItem('wallet', this.wallet);
        });
    }

    onClickSignIn() {
        this.dialog.open(LoginComponent, {
            height: '450px',
            width: '400px',
        }).afterClosed().subscribe(res => {
            if (res) {
                this.dialog.closeAll();
                this.toastrService.success('Đăng nhập thành công 😍👌');
                setTimeout(() => {
                    window.location.reload();
                    this.isLoggedIn = true;
                }, 2500);
            }
        })
    }

    onClickSignUp() {
        this.dialog.open(RegisterComponent, {
            height: '500px',
            width: '400px',
        }).afterClosed().subscribe(res => {
            if (res) {
                this.dialog.closeAll();
                this.toastrService.success('Đăng ký thành công 😍👌');
            }
        })
    }

    onClickSignOut() {
        localStorage.clear();
        this.toastrService.success('Bạn đã đăng xuất 😥😥');
        setTimeout(() => {
            window.location.reload();
            this.isLoggedIn = false;
        }, 2500);
    }

    checkCart() {
        let cart = JSON.parse(localStorage.getItem('cart'));
        if (cart) {
            this.countCart = cart.courses.length;
        }
    }
    onClickCart() {
        // this.dialog.open(CartComponent, {
        //     height: '500px',
        //     width: '1055px',
        // });
    }

}


