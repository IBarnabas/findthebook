import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BookDesc } from '../models/book-description.type';

/**
 * BookService: Service to call http request to get book's desciption from openlibrary APi.
 */
@Injectable({
  providedIn: 'root'
})
export class BookService  {
  constructor(private http: HttpClient) { }

  /**
   * Call http get to get book's desciption json file.
   * @param id book id
   * @returns BookDesc obervable object
   */
  getBookDesciptionById(id: string){
    let url = "https://openlibrary.org/works/" + id + ".json";
    return this.http.get<BookDesc>(url);
  }
}
