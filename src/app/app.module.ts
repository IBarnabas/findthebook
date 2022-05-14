import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule }  from '@angular/material/progress-spinner'
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog'

 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app.component/app.component';
import { HttpClientModule } from '@angular/common/http';
import { FindBookComponent } from './components/find-book/find-book.component';
import { AuthorPageComponent } from './components/author-page/author-page.component';
import { BookDetailsPageComponent } from './components/book-details-page/book-details-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogCoverComponent } from './components/dialog-cover/dialog-cover.component';
@NgModule({
  declarations: [
    AppComponent,
    FindBookComponent,
    AuthorPageComponent,
    BookDetailsPageComponent,
    DialogCoverComponent
  ],
  entryComponents: [DialogCoverComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatListModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    MatDialogModule
  ],
  providers: [ ],
  bootstrap: [AppComponent],
})
export class AppModule { }
