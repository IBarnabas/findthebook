import { Book } from "./book.type";

export interface ApiSearchResult{
    num_found: number;
    docs: Book[];
}