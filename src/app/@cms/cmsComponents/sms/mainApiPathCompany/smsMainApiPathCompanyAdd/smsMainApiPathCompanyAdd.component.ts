import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { CoreEnumService } from "app/@cms/cmsService/core/coreEnum.service";
import { ToastrService } from "ngx-toastr";
import { PublicHelper } from "app/@cms/cmsCommon/helper/publicHelper";
import { ErrorExcptionResult } from "app/@cms/cmsModels/base/errorExcptionResult";
import { FormGroup } from "@angular/forms";
import { baseEntityCategory } from "app/@cms/cmsModels/base/baseEntityCategory";
import { NewsCategoryService } from "app/@cms/cmsService/news/newsCategory.service";
import { FormInfoModel } from "app/@cms/cmsModels/base/formInfoModel";
import { SmsMainApiPathCompanyService } from "app/@cms/cmsService/sms/smsMainApiPathCompany.service";
import { SmsMainApiCompany } from "app/@cms/cmsModels/sms/smsMainApiCompany";

@Component({
  selector: "app-smsMainApiPathCompanyAdd",
  templateUrl: "./smsMainApiPathCompanyAdd.component.html",
  styleUrls: ["./smsMainApiPathCompanyAdd.component.scss"],
})
export class SmsMainApiPathCompanyAddComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    public coreEnumService: CoreEnumService,
    private smsMainApiPathCompanyService: SmsMainApiPathCompanyService,
    private alertService: ToastrService,
    private publicHelper: PublicHelper
  ) {
    this.coreEnumService.resultEnumRecordStatusObs.subscribe((vlaue) => {
      if (vlaue && vlaue.IsSuccess) this.coreEnumService.resultEnumRecordStatus = vlaue;
      this.coreEnumService.ServiceEnumRecordStatus() ;
    });
  }
  ngOnInit() {
   // this.DataGetAllCoreEnum();
  }
  @Input()
  set options(model: any) {
    this.dateModleInput = model;
  }
  get options(): any {
    return this.dateModleInput;
  }
  private dateModleInput: any;
  //dataResultCoreEnum: ErrorExcptionResult<any> = new ErrorExcptionResult<any>();
  dataResult: ErrorExcptionResult<SmsMainApiCompany> = new ErrorExcptionResult<
    SmsMainApiCompany
  >();
  dataModel: SmsMainApiCompany = new SmsMainApiCompany();

  @ViewChild("vform", { static: false }) formGroup: FormGroup;

  formInfo: FormInfoModel = new FormInfoModel();

  // DataGetAllCoreEnum() {
  //   if (this.dataResultCoreEnum && this.dataResultCoreEnum.IsSuccess&& this.dataResultCoreEnum.ListItems && this.dataResultCoreEnum.ListItems.length>0) return;
  //   this.coreEnumService.ServiceEnumRecordStatus().subscribe(
  //     (next) => {
  //       if (next.IsSuccess) {
  //         this.dataResultCoreEnum = next;
  //       }
  //     },
  //     (error) => {
  //       this.alertService.error(
  //         this.publicHelper.CheckError(error),
  //         "برروی خطا در دریافت اطلاعات"
  //       );
  //     }
  //   );
  // }
  DataAddContent() {
    this.formInfo.formAlert = "در حال ارسال اطلاعات به سرور";
    this.formInfo.formError = "";
    this.smsMainApiPathCompanyService
      .ServiceAdd<SmsMainApiCompany>(this.dataModel)
      .subscribe(
        (next) => {
          this.formInfo.formSubmitted = next.IsSuccess;
          this.dataResult = next;
          if (next.IsSuccess) {
            this.formInfo.formAlert = "ثبت با موفقت انجام شد";
          } else {
            this.formInfo.formAlert = "برروز خطا";
            this.formInfo.formError = next.ErrorMessage;
          }
        },
        (error) => {
          this.formInfo.formSubmitted = false;
          this.alertService.error(
            this.publicHelper.CheckError(error),
            "برروی خطا در دریافت اطلاعات"
          );
        }
      );
  }
  onFormSubmit() {
    if (this.formGroup.valid) {
      this.formInfo.formSubmitted = true;
      this.DataAddContent();
    }
  }
  onFormCancel() {
    this.formGroup.reset();
  }
}
