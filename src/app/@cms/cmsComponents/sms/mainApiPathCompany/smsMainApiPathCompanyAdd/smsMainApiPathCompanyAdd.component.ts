import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { CoreEnumService } from "app/@cms/cmsService/core/coreEnum.service";
import { ToastrService } from "ngx-toastr";
import { PublicHelper } from "app/@cms/cmsCommon/helper/publicHelper";
import { ErrorExcptionResult } from "app/@cms/cmsModels/base/errorExcptionResult";
import { FormGroup } from "@angular/forms";
import { FormInfoModel } from "app/@cms/cmsModels/base/formInfoModel";
import { SmsMainApiPathCompanyService } from "app/@cms/cmsService/sms/smsMainApiPathCompany.service";
import { SmsMainApiCompanyModel } from 'app/@cms/cmsModels/sms/smsMainApiCompanyModel';
import { CmsToastrServiceService } from 'app/@cms/cmsService/_base/cmsToastrService.service';


@Component({
  selector: "app-sms-main-api-path-company-add",
  templateUrl: "./smsMainApiPathCompanyAdd.component.html",
  styleUrls: ["./smsMainApiPathCompanyAdd.component.scss"],
})
export class SmsMainApiPathCompanyAddComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    public coreEnumService: CoreEnumService,
    private smsMainApiPathCompanyService: SmsMainApiPathCompanyService,
    private toastrService: CmsToastrServiceService,
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
  //dataModelResultCoreEnum: ErrorExcptionResult<any> = new ErrorExcptionResult<any>();
  dataModelResult: ErrorExcptionResult<SmsMainApiCompanyModel> = new ErrorExcptionResult<
  SmsMainApiCompanyModel
  >();
  dataModel: SmsMainApiCompanyModel = new SmsMainApiCompanyModel();

  @ViewChild("vform", { static: false }) formGroup: FormGroup;

  formInfo: FormInfoModel = new FormInfoModel();


  DataAddContent() {
    this.formInfo.formAlert = "در حال ارسال اطلاعات به سرور";
    this.formInfo.formError = "";
    this.smsMainApiPathCompanyService
      .ServiceAdd(this.dataModel)
      .subscribe(
        (next) => {
          this.formInfo.formAllowSubmit = !next.IsSuccess;
          this.dataModelResult = next;
          if (next.IsSuccess) {
            this.formInfo.formAlert = "ثبت با موفقت انجام شد";
          } else {
            this.formInfo.formAlert = "برروز خطا";
            this.formInfo.formError = next.ErrorMessage;
          }
        },
        (error) => {
          this.formInfo.formAllowSubmit = true;
          this.toastrService.toastr.error(
            this.publicHelper.CheckError(error),
            "برروی خطا در دریافت اطلاعات"
          );
        }
      );
  }
  onFormSubmit() {
    if (this.formGroup.valid) {
      this.formInfo.formAllowSubmit = false;
      this.DataAddContent();
    }
  }
  onFormCancel() {
    this.formGroup.reset();
  }
}
