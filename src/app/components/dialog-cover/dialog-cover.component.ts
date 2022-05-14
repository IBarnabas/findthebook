import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog'

/**
 * DialogCoverComponent: A component that display an image.
 * Image url get in the data parameter.
 */
@Component({
  selector: 'app-dialog-cover',
  templateUrl: './dialog-cover.component.html',
  styleUrls: ['./dialog-cover.component.css']
})
export class DialogCoverComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {}
}
