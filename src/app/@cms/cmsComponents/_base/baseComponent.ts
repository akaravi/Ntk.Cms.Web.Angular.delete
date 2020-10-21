import { ChangeDetectorRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PublicHelper } from 'app/@cms/cmsCommon/helper/publicHelper';
import { CmsToastrServiceService } from 'app/@cms/cmsService/_base/cmsToastrService.service';

export class BaseComponent {
    constructor(
        //public cdRef: ChangeDetectorRef,
        public toastrService: CmsToastrServiceService,
        public publicHelper: PublicHelper,
        public modalService: NgbModal
      ) {

      }
}
