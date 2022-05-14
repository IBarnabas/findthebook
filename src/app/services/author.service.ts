import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Author } from '../models/author.tpye';

/**
 * AuthorService: Service to call http request to get Author's data from openlibrary APi.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  constructor(private http: HttpClient) {}

  /**
   * Call http get to get author's data json file.
   * @param id author id
   * @returns Author obervable object
   */
  getAuthor(id: string){
    let url = "https://openlibrary.org/authors/" + id + ".json";

    return this.http.get<Author>(url);
  }

}
