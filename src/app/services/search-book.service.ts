import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiSearchResult } from '../models/api-search-result.type';

/**
 * SearchBookService: Service to call http request to get books' data from openlibrary APi.
 */
@Injectable({
  providedIn: 'root'
})
export class SearchBookService {
    constructor(private http: HttpClient) {}

    /**
     * Set the url from the @params then call http get to get books' data json file.
     * @param title search param title
     * @param author search param author
     * @param subject search param subject
     * @param limit search param limit
     * @returns ApiSearchResult obervable object
     */
    getBooks(title: string, author: string, subject: string, limit: string){
      let search_url = "";
      let oneArgument = true;

      if (title != null && title != "") {
        search_url = search_url.concat((oneArgument) ? "" : "&", "title=", title);
        oneArgument = false;
      }
  
      if (author != null && author != "") {
        search_url =  search_url.concat((oneArgument) ? "" : "&", "author=", author);
        oneArgument = false;
      }
  
      if (subject != null && subject != "") {
        search_url = search_url.concat((oneArgument) ? "" : "&", "subject=", subject);
        oneArgument = false;
      }
  
      search_url = search_url.replaceAll(" ", "+");
      let url = "http://openlibrary.org/search.json?" + search_url + "&limit=" + limit;
      
      return this.http.get<ApiSearchResult>(url);
    }  
}