import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'primeng/carousel';
import { SidebarModule } from 'primeng/sidebar';
import { HeaderComponent } from './components/includes/header/header.component';
import { SliderComponent } from './components/slider/slider.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/includes/footer/footer.component';
import { PipeModule } from './pipe/pipe.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { SkeletonModule } from './shared/skeleton/skeleton.module';
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './components/includes/login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { ReactiveFormsModule } from "@angular/forms";
import { ApiInterceptor } from './helpers/api.interceptor ';
import { MatDialogModule, MatIconModule } from '@angular/material';
import { RegisterComponent } from './components/includes/register/register.component';
import { FormConfirmComponent } from './components/includes/form-confirm/form-confirm.component';



@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        SliderComponent,
        HomeComponent,
        FooterComponent,
        LoginComponent,
        RegisterComponent,
        FormConfirmComponent,
    ],
    entryComponents: [
        RegisterComponent,
        LoginComponent,
        FormConfirmComponent
      ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FormsModule,
        PipeModule,
        CarouselModule,
        SidebarModule,
        MatProgressSpinnerModule,
        MatProgressBarModule,
        SkeletonModule,
        NgbModule,
        MatDialogModule,
        MatIconModule,
        ReactiveFormsModule,
        ToastrModule.forRoot({
            timeOut: 1500,
            positionClass: 'toast-bottom-center',
            preventDuplicates: false,
            progressBar: true,
        }),
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ApiInterceptor, multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
