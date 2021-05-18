import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/includes/cart/cart.component';
import { LoginComponent } from './components/includes/login/login.component';
import { UserComponent } from './components/user/user.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },

  {
    path: 'movies',
    loadChildren: () => import('./components/movies/movies.module').then(mod => mod.MoviesModule)
  },

  {
    path: 'movies/:id', loadChildren: () => import('./components/movie-details/movie-details.module').then(mod => mod.MovieDetailsModule)
  },
  {
    path: 'courses/:slug', loadChildren: () => import('./components/course-details/course-details.module').then(mod => mod.CourseDetailsModule)
  },
  {
    path: 'tv',
    loadChildren: () => import('./components/tv-shows/tv-shows.module').then(mod => mod.TvShowsModule)
  },

  {
    path: 'tv/:id',
    loadChildren: () => import('./components/tv-show-details/tv-show-details.module').then(mod => mod.TvShowDetailsModule)
  },

  {
    path: 'genres/:id/:name',
    loadChildren: () => import('./components/genre/genre.module').then(mod => mod.GenreModule)
  },

  {
    path: 'genres',
    loadChildren: () => import('./components/genre-list/genre-list.module').then(mod => mod.GenreListModule)
  },
  {
    path: 'courses',
    loadChildren: () => import('./components/courses/courses.module').then(mod => mod.CoursesModule)
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
    path: 'person/:id',
    loadChildren: () => import('./components/person/person.module').then(mod => mod.PersonModule)
  },

  {
    path: 'genres-tv/:id/:name',
    loadChildren: () => import('./components/tv-genre/tv-genre.module').then(m => m.TvGenreModule)
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
