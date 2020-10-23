import { ComponentOptionModalModel } from './../../../cmsComponentModels/base/componentOptionModalModel';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ComponentModalDataModel } from 'app/@cms/cmsModels/base/componentModalModel';

@Component({
  selector: 'app-cms-modal',
  templateUrl: './cmsModal.component.html',
  styleUrls: ['./cmsModal.component.scss']
})
export class CmsModalComponent implements OnInit {


  @Input()
  set options(model: ComponentOptionModalModel) {
    this.optionsData = model;
    if (this.optionsData.data.hidden == null) {
      this.optionsData.data.hidden = true;
    }

    model.methods = {
      openModal: (x) => this.ActionOpenModal(x)
    }
  }
  get options(): ComponentOptionModalModel {
    if (this.optionsData.data.hidden) {

    }
    return this.optionsData;
  }
  @ViewChild('contentModal', { static: false })
  contentModal: ElementRef;

  optionsData: ComponentOptionModalModel = new ComponentOptionModalModel();

  Title = '';

  constructor(
    private modalService: NgbModal,

  ) {

  }
  ngOnInit() {
  }
  ActionOpenModal(model: ComponentModalDataModel) {
    this.Title = model.Title;
    const modaloptions: NgbModalOptions = {
      size: 'lg',
      windowClass: 'openModalLarg',
    };
    this.modalService.open(this.contentModal, modaloptions).result.then(
      (result) => {
        const closeResult = `بسته شدن با: ${result}`;

        this.optionsData.data.result = result;
        this.optionsData.data.closeResult = closeResult;
        this.optionsData.actions.onClose();

      },
      (reason) => {
        const closeResult = `رها شدن با ${this.getDismissReason(reason)}`;
        this.optionsData.data.reason = reason;
        this.optionsData.data.closeResult = closeResult;
        this.optionsData.actions.onClose();
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

}
