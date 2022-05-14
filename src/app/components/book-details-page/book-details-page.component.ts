import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, } from '@angular/router';
import { BookService } from 'src/app/services/book.service';
import { Book } from 'src/app/models/book.type';
import { MatDialog } from '@angular/material/dialog'
import { DialogCoverComponent } from '../dialog-cover/dialog-cover.component';

/**
 * BookDetailsPageComponent: A component that displays the book's information.
 */
@Component({
  selector: 'app-book-details-page',
  templateUrl: './book-details-page.component.html',
  styleUrls: ['./book-details-page.component.css']
})
export class BookDetailsPageComponent implements OnInit {
  constructor(public dialog: MatDialog, private route: ActivatedRoute, private bookDescService: BookService) { }

  book!: Book;
  id!: string;
  description!: string;
  pageNumber = ""
  enablebook = true;

  /**
   * BookDetailsPageComponent Init: get the book id and the book datas from the router parameter.
   */
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.book = history.state.book;
    this.getDescripiton(this.id);

    if (this.book == null)
      this.enablebook = false;

    this.pageNumber = (this.book.number_of_pages_median == -1) ? "Undefined" : "" + this.book.number_of_pages_median;
  }

  /**
   * Call bookDescService getBookDesciptionById() to get book description.
   * @param id book id
   */
  getDescripiton(id: string) {
    this.bookDescService.getBookDesciptionById(id).subscribe(
      res => {
        //this.description = res.description;
        this.description = "";
        if (this.description == "[object Object]")
          this.description = "";
      });
  }

  /**
   * Open the DialogCoverComponent which contain the cover of the book in a large size.
   */
  zoomCover() {
    this.dialog.open(DialogCoverComponent, {
      height: '500px', data: { src: this.book.coversUrl[2] }
    });
  }

}