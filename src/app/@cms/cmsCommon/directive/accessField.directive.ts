import { Directive, ElementRef, Input } from '@angular/core';
// import { forEach } from 'core-js/fn/array';
import { AccessModel } from 'ntk-cms-api';
import { Observable } from 'rxjs';

@Directive({
  selector: '[appAccessField]'
})
export class AccessFieldDirective {


  @Input() accessModel: AccessModel;
  fildName = '';

  constructor(private elementRef: ElementRef) {

  }

  ngOnInit(): void {
    this.accessModel.FieldsInfo.forEach(element => {
      if (element.FieldTitle === this.fildName) {
        if (!element.AccessWatchField) {
          this.elementRef.nativeElement.style.display = 'none';
          return;
        }
        if (!element.AccessEditField) {
          this.elementRef.nativeElement.disabled = true;
        }
      }
    });
  }

}
