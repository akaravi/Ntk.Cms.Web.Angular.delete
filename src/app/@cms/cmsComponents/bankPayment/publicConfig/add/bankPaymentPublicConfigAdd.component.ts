import { Component, OnInit, Input, ViewChild, ChangeDetectorRef } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { PublicHelper } from "app/@cms/cmsCommon/helper/publicHelper";
import { FormGroup } from "@angular/forms";
import { CmsToastrServiceService } from 'app/@cms/cmsService/base/cmsToastrService.service';
import { BankPaymentPublicConfigModel, BankPaymentPublicConfigService, CoreEnumService, EnumModel, ErrorExcptionResult, FormInfoModel } from 'ntk-cms-api';


@Component({
  selector: 'app-bank-payment-public-config-add',
  templateUrl: "./bankPaymentPublicConfigAdd.component.html",
  styleUrls: ["./bankPaymentPublicConfigAdd.component.scss"],
})
export class BankPaymentPublicConfigAddComponent implements OnInit {
  constructor(
    private changeDetectorRef:ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    public coreEnumService: CoreEnumService,
    private toastrService: CmsToastrServiceService,
    private publicHelper: PublicHelper,
    public bankPaymentPublicConfigService: BankPaymentPublicConfigService
  ) {
    // this.coreEnumService.resultEnumRecordStatusObs.subscribe((vlaue) => {
    //   if (vlaue && vlaue.IsSuccess)
    //     this.coreEnumService.resultEnumRecordStatus = vlaue;
    //   this.coreEnumService.ServiceEnumRecordStatus();
    // });
  }
  ngOnInit() {
    // this.DataGetAllCoreEnum();
    this.getEnumRecordStatus();
  }
  dataModelEnumRecordStatusResult: ErrorExcptionResult<EnumModel> = new ErrorExcptionResult<EnumModel>();

  getEnumRecordStatus(): void {
    this.coreEnumService.ServiceEnumRecordStatus().subscribe((res) => {
      this.dataModelEnumRecordStatusResult = res;
    });
  }
  loadingStatus = false; // add one more property

  @Input()
  set options(model: any) {
    this.dateModleInput = model;
  }
  get options(): any {
    return this.dateModleInput;
  }
  private dateModleInput: any;
  dataModelResult: ErrorExcptionResult<
  BankPaymentPublicConfigModel
  > = new ErrorExcptionResult<BankPaymentPublicConfigModel>();
  dataModel: BankPaymentPublicConfigModel = new BankPaymentPublicConfigModel();

  @ViewChild("vform", { static: false }) formGroup: FormGroup;

  formInfo: FormInfoModel = new FormInfoModel();

  DataAddContent() {
    this.formInfo.formAlert = "در حال ارسال اطلاعات به سرور";
    this.formInfo.formError = "";
    this.loadingStatus=true;
    this.bankPaymentPublicConfigService.ServiceAdd(this.dataModel).subscribe(
      (next) => {
        this.formInfo.formAllowSubmit = !next.IsSuccess;
        this.dataModelResult = next;
        if (next.IsSuccess) {
          this.formInfo.formAlert = "ثبت با موفقت انجام شد";
        } else {
          this.formInfo.formAlert = "برروز خطا";
          this.formInfo.formError = next.ErrorMessage;
        }
        this.loadingStatus=false;
      },
      (error) => {
        this.formInfo.formAllowSubmit = true;
        this.toastrService.toastr.error(
          this.publicHelper.CheckError(error),
          "برروی خطا در دریافت اطلاعات"
        );
        this.loadingStatus=false;
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
