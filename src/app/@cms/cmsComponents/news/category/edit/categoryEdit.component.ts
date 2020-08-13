import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-news-category-edit',
  templateUrl: './categoryEdit.component.html',
  styleUrls: ['./categoryEdit.component.scss']
})
export class NewsCategoryEditComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  @Input()
  set options(model: any) {
    this.dateModleInput = model;
  }
  get options(): any {
    return this.dateModleInput;
  }
  private dateModleInput: any;
}
