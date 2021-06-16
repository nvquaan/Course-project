import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/includes/cart/cart.component';
import { UserComponent } from './components/user/user.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'active',
        component: HomeComponent,
    },
    {
        path: 'courses/:slug', loadChildren: () => import('./components/course-details/course-details.module').then(mod => mod.CourseDetailsModule)
    },
    {
        path: 'courses',
        loadChildren: () => import('./components/courses/courses.module').then(mod => mod.CoursesModule)
    },
    {
        path: 'categories',
        loadChildren: () => import('./components/categories/categories.module').then(mod => mod.CategoriesModule)
    },
    {
        path: 'cart',
        component: CartComponent,
    },
    {
        path: 'account',
        component: UserComponent,
    },
    {
        path: '**',
        redirectTo: ''
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
