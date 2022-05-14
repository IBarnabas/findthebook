import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Book } from 'src/app/models/book.type';
import { AuthorOfBook } from 'src/app/models/book-result-author.type';
import { SearchBookService } from 'src/app/services/search-book.service';

/**
 * FindBookComponent: A component where search books.
 */
@Component({
  selector: 'app-find-book',
  templateUrl: './find-book.component.html',
  styleUrls: ['./find-book.component.css']
})
export class FindBookComponent implements OnInit {
  constructor(private route: Router, private searchbookService: SearchBookService) { }

  prevTitle = "";
  prevAuthor = "";
  prevSubject = "";
  search_url: string = "";
  title!: FormControl;
  author!: FormControl;
  subject!: FormControl;
  books: Book[] = [];;
  selectedBook!: string;
  loading = false;
  isClear = false;
  limit = "";
  resultFind = false;

  /**
   * FindBookComponent Init: Initializes formcontrols value from the local storage
   */
  ngOnInit(): void {
    this.prevTitle = (localStorage.getItem("title")! == null) ? "" : localStorage.getItem("title")!;
    this.prevAuthor = (localStorage.getItem("author")! == null) ? "" : localStorage.getItem("author")!;
    this.prevSubject = (localStorage.getItem("subject")! == null) ? "" : localStorage.getItem("subject")!;
    this.limit = (localStorage.getItem("limit")! == null) ? "5" : localStorage.getItem("limit")!;

    this.title = new FormControl(this.prevTitle);
    this.author = new FormControl(this.prevAuthor);
    this.subject = new FormControl(this.prevSubject);
  }


  /**
   * Call SearchBookService getBooks() to get books which match the search params.
   * Then initializes the books array and save the search params to the local storage.
   */
  findBook() {
    this.search_url = "";
    this.books = []
    this.loading = true;
    this.searchbookService.getBooks(this.title.value, this.author.value, this.subject.value, this.limit).subscribe(res => {
      res.docs.map(value => {
        this.books.push({
          key: value.key.replace("/works/", ""),
          title: (value.title === undefined) ? "Undefined" : value.title,
          authors: this.setAuthors(value.author_name, value.author_key),
          author_name: (value.author_name === undefined) ? ["Undefined"] : value.author_name,
          author_key: (value.author_key === undefined) ? ["Undefined"] : value.author_key,
          subject: (value.subject === undefined) ? ["Undefined"] : value.subject,
          cover_i: value.cover_i,
          coversUrl: this.setBookImages(value.cover_i),
          first_publish_year: (value.first_publish_year === undefined) ? -1 : value.first_publish_year,
          number_of_pages_median: (value.number_of_pages_median === undefined) ? -1 : value.number_of_pages_median
        });
      });
      this.loading = false;
      if (this.books.length > 0){
        this.isClear = true;
        this.resultFind = false;
      }
        
      if (this.books.length == 0){
        this.resultFind = true;
      }

      localStorage.setItem("title", this.title.value);
      localStorage.setItem("author", this.author.value);
      localStorage.setItem("subject", this.subject.value);
      localStorage.setItem("limit", this.limit);
    });
  }

  /**
   * Navigato to BookDetailsPageComponent and pass the book parameter in router param.
   * @param book selected book that pass in router param
   */
  openBook(book: Book) {
    this.route.navigateByUrl('/book/' + book.key, { state: { book: book } })
  }

  /**
   * Clear the search results.
   */
  clearResults() {
    this.loading = false;
    this.books = [];
    this.isClear = false;
    this.resultFind = false;
  }

  /**
   * Set the book's covers link from the @param value
   * @param value number of the cover Id
   * @returns covers' url array
   */
  private setBookImages(value: number) {
    if (value === undefined) {
      return ["assets/missing_cover.jpg", "assets/missing_cover.jpg", "assets/missing_cover.jpg"];
    }

    let result = [];
    let url = "https://covers.openlibrary.org/b/id/";

    result.push(url + value + "-S.jpg");
    result.push(url + value + "-M.jpg");
    result.push(url + value + "-L.jpg");

    return result;
  }

  /**
   * Set the author's name-key array from the @param names and @param keys
   * @param names authors names array
   * @param keys authors keys array
   * @returns authors name-key array
   */
  private setAuthors(names: string[], keys: string[]) {
    if (names === undefined) {
      return [{ name: "undefined", key: "undefined" }];
    }

    let result: AuthorOfBook[] = [];
    for (let i = 0; i < names.length; i++) {
      result.push({ name: names[i], key: keys[i] });
    }

    return result;
  }
}
