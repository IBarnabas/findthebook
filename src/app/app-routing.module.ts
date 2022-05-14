import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './components/app.component/app.component';
import { AuthorPageComponent } from './components/author-page/author-page.component';
import { BookDetailsPageComponent } from './components/book-details-page/book-details-page.component';
import { FindBookComponent } from './components/find-book/find-book.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/findbook'},
  {path: 'findbook', component: FindBookComponent},
  {path: 'author', component: AuthorPageComponent},
  {path: 'author/:id', component: AuthorPageComponent},
  {path: 'book', component: BookDetailsPageComponent},
  {path: 'book/:id', component: BookDetailsPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
