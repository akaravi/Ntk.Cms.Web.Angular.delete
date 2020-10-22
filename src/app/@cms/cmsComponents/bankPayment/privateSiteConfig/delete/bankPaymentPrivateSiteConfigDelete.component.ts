import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { BankPaymentPrivateSiteConfigService } from 'app/@cms/cmsService/bankPayment/bankPaymentPrivateSiteConfig.service';
import { FormGroup } from '@angular/forms';
import { FormInfoModel } from 'app/@cms/cmsModels/base/formInfoModel';
import { PublicHelper } from 'app/@cms/cmsCommon/helper/publicHelper';
import { CmsToastrServiceService } from 'app/@cms/cmsService/_base/cmsToastrService.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bank-payment-private-site-config-delete',
  templateUrl: './bankPaymentPrivateSiteConfigDelete.component.html',
  styleUrls: ['./bankPaymentPrivateSiteConfigDelete.component.scss']
})
export class BankPaymentPrivateSiteConfigDeleteComponent implements OnInit{
  @Input()
  set options(model: any) {
    this.dateModleInput = model;
  }
  get options(): any {
    return this.dateModleInput;
  }
  constructor(
    private activatedRoute: ActivatedRoute,
    private categoryService: BankPaymentPrivateSiteConfigService,
    private toastrService: CmsToastrServiceService,
    private publicHelper: PublicHelper,
    private bankPaymentPrivateSiteConfigService: BankPaymentPrivateSiteConfigService
  ) {}
  id: any;

  private dateModleInput: any;
  @ViewChild("vform", { static: false })
  formGroup: FormGroup;

  formInfo: FormInfoModel = new FormInfoModel();

  ngOnInit() {
    this.id = Number.parseInt(this.activatedRoute.snapshot.paramMap.get("id"));
    this.activatedRoute.queryParams.subscribe((params) => {
      // Defaults to 0 if no query param provided.
      this.id = +params["id"] || 0;
    });
    if (this.dateModleInput && this.dateModleInput.id) {
      this.id = this.dateModleInput.id;
    }
    if (!this.id || this.id == 0) {
      this.formInfo.formAlert = "برروز خطا";
      this.formInfo.formError = "شناسه دسته بندی مشخص نمی باشد";
      this.formInfo.disabledButtonSubmitted = true;
      return;
    }
  }
}
