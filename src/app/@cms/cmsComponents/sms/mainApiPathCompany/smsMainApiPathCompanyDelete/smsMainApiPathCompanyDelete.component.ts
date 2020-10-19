import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { PublicHelper } from "app/@cms/cmsCommon/helper/publicHelper";
import { FormInfoModel } from "app/@cms/cmsModels/base/formInfoModel";
import { SmsMainApiPathCompanyService } from "app/@cms/cmsService/sms/smsMainApiPathCompany.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-sms-main-api-path-company-delete",
  templateUrl: "./smsMainApiPathCompanyDelete.component.html",
  styleUrls: ["./smsMainApiPathCompanyDelete.component.scss"],
})
export class SmsMainApiPathCompanyDeleteComponent implements OnInit {
  @Input()
  set options(model: any) {
    this.dateModleInput = model;
  }
  get options(): any {
    return this.dateModleInput;
  }
  constructor(
    private activatedRoute: ActivatedRoute,
    private categoryService: SmsMainApiPathCompanyService,
    private alertService: ToastrService,
    private publicHelper: PublicHelper
  ) {}
  Id: any;

  private dateModleInput: any;
  @ViewChild("vform", { static: false })
  formGroup: FormGroup;

  formInfo: FormInfoModel = new FormInfoModel();

  ngOnInit() {
    this.Id = Number.parseInt(this.activatedRoute.snapshot.paramMap.get("id"));
    this.activatedRoute.queryParams.subscribe((params) => {
      // Defaults to 0 if no query param provided.
      this.Id = +params["id"] || 0;
    });
    if (this.dateModleInput && this.dateModleInput.Id) {
      this.Id = this.dateModleInput.Id;
    }
    if (!this.Id || this.Id == 0) {
      this.formInfo.formAlert = "برروز خطا";
      this.formInfo.formError = "شناسه دسته بندی مشخص نمی باشد";
      this.formInfo.disabledButtonSubmitted = true;
      return;
    }
  }
}
