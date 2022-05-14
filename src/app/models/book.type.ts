import { AuthorOfBook } from "./book-result-author.type";

export interface Book {
    key: string;
    title: string;
    author_name: string[];
    author_key: string[];
    authors: AuthorOfBook[];
    subject: string[];
    cover_i: number;
    coversUrl: string[];
    first_publish_year: number;
    number_of_pages_median: number;
}