import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ComponentModalDataModel } from 'app/@cms/cmsModels/base/componentModalModel';

@Component({
  selector: 'app-cms-modal',
  templateUrl: './cmsModal.component.html',
  styleUrls: ['./cmsModal.component.scss']
})
export class CmsModalComponent implements OnInit {
  @ViewChild('contentModal', { static: false })
  contentModal: ElementRef;
 
  constructor(
    private modalService: NgbModal,

  ) {
    //this.optionsData = new ComponentModalDataModel();

  }


  ngOnInit() {
  }
  ActionOpenModal(model: ComponentModalDataModel) {

    //this.optionsData = model;
    this.modalService.open(this.contentModal).result.then(
      (result) => {
        const closeResult = `بسته شدن با: ${result}`;
        this.ActionCloseModal(result, closeResult);
      },
      (reason) => {
        const closeResult = `رها شدن با ${this.getDismissReason(reason)}`;
        this.ActionReasonModal(reason, closeResult);
      }
    );
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'با فشردن ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'با کلیک کردن یک backdrop';
    } else {
      return `با: ${reason}`;
    }
  }
  ActionCloseModal(result: any, closeResult: string) {

  }
  ActionReasonModal(reason: any, closeResult: string) {

  }
}
