import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Author } from 'src/app/models/author.tpye';
import { AuthorService } from 'src/app/services/author.service';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog'
import { DialogCoverComponent } from '../dialog-cover/dialog-cover.component';

/**
 * AuthorPageComponent: A component that display the author's information.
 */
@Component({
  selector: 'app-author-page',
  templateUrl: './author-page.component.html',
  styleUrls: ['./author-page.component.css']
})
export class AuthorPageComponent implements OnInit {
  constructor(public dialog: MatDialog, private route: ActivatedRoute, private authorService: AuthorService, private location: Location) { }

  author!: Author;
  id!: string;
  currentIMG = 0;
  imgNumbers = 0;
  enablePagingButton = true;
  enableauthor = true;

  /**
   * AuthorPageComponent Init: get the author id from the router parameter.
   */
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];

    });
    this.getAuthor(this.id);

    if (this.author == null)
      this.enableauthor = false;
  }

  /**
   * Call AuthorService getAuthor() to get authors informations.
   * Then initializes the author params.
   * @param id author id
   */
  getAuthor(id: string) {
    this.authorService.getAuthor(id).subscribe(
      res => {
        this.author = {
          name: (res.name === undefined) ? "Undefined" : res.name,
          birth_date: (res.birth_date === undefined) ? "Undefined" : res.birth_date,
          bio: (res.bio === undefined) ? "Bio: Undefined" : res.bio,
          photos: (res.photos === undefined) ? [] : res.photos,
          coversUrl: []
        }
        this.setPhotos();
        this.imgNumbers = this.author.coversUrl.length;

        if (this.imgNumbers == 0)
          this.enablePagingButton = false;

        if (this.author.bio == "[object Object]")
          this.author.bio = "";

        if (this.author != null)
          this.enableauthor = true;
      });
  }

  /**
   * Set the author's photos link from the author's photos number.
   */
  setPhotos() {
    let numbers = this.author.photos;
    let links: string[] = [];
    for (let i = 0; i < numbers.length; i++) {
      links.push("https://covers.openlibrary.org/a/id/" + numbers[i] + "-M.jpg")
    }
    this.author.coversUrl = links;
  }

  /**
   * Back to the previous component.
   */
  back() {
    this.location.back();
  }

  /**
   * Open the DialogCoverComponent which contain the currentIMG of author in a large size.
   */
  zoomPhoto() {
    this.dialog.open(DialogCoverComponent, {
      height: '500px',
      data: { src: this.author.coversUrl[this.currentIMG].replace("-M.jpg", "-L.jpg") }
    });
  }

}
