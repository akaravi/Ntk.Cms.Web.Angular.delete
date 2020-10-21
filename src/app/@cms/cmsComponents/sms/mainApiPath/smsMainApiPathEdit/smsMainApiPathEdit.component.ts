import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { PublicHelper } from "app/@cms/cmsCommon/helper/publicHelper";
import { ErrorExcptionResult } from "app/@cms/cmsModels/base/errorExcptionResult";
import { FormInfoModel } from "app/@cms/cmsModels/base/formInfoModel";
import { SmsMainApiPathModel } from 'app/@cms/cmsModels/sms/smsMainApiPathModel';
import { CoreEnumService } from "app/@cms/cmsService/core/coreEnum.service";
import { SmsMainApiPathService } from 'app/@cms/cmsService/sms/smsMainApiPath.service';
import { CmsToastrServiceService } from 'app/@cms/cmsService/_base/cmsToastrService.service';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-sms-main-api-path-edit',
  templateUrl: './smsMainApiPathEdit.component.html',
  styleUrls: ['./smsMainApiPathEdit.component.scss']
})
export class SmsMainApiPathEditComponent implements OnInit {
  @ViewChild("vform", { static: false })
  formGroup: FormGroup;
  @Input()
  set options(model: any) {
    this.dateModleInput = model;
  }
  get options(): any {
    return this.dateModleInput;
  }
  private dateModleInput: any;
  constructor(
    private changeDetectorRef:ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    public smsMainApiPathService: SmsMainApiPathService,
    public coreEnumService: CoreEnumService,
    private toastrService: CmsToastrServiceService,
    private publicHelper: PublicHelper
  ) {
    this.coreEnumService.resultEnumRecordStatusObs.subscribe((vlaue) => {
      if (vlaue && vlaue.IsSuccess)
        this.coreEnumService.resultEnumRecordStatus = vlaue;
      this.coreEnumService.ServiceEnumRecordStatus();
    });
  }

  formInfo: FormInfoModel = new FormInfoModel();
  dataModel: SmsMainApiPathModel = new SmsMainApiPathModel();
  dataModelResult: ErrorExcptionResult<
  SmsMainApiPathModel
  > = new ErrorExcptionResult<SmsMainApiPathModel>();
  ContentId: number;

  ngOnInit() {
    this.ContentId = Number.parseInt(
      this.activatedRoute.snapshot.paramMap.get("id")
    );
    this.activatedRoute.queryParams.subscribe((params) => {
      // Defaults to 0 if no query param provided.
      this.ContentId = +params["id"] || 0;
    });
    if (this.dateModleInput && this.dateModleInput.ContentId) {
      this.ContentId = this.dateModleInput.ContentId;
    }
    this.DataGetOneContent();
    //alert("helo Id:"+this.linkCategoryId)

    // this.DataGetAllCoreEnum();
  }
  loadingStatus = false; // add one more property
  ngAfterViewChecked() {
    let show = this.smsMainApiPathService.loadingStatus;
    if (show != this.loadingStatus) {
      this.loadingStatus = show;
      this.changeDetectorRef.detectChanges();
    }
  }
  
  onFormSubmit() {
    if (this.formGroup.valid) {
      this.formInfo.formAllowSubmit = false;
      this.DataEditContent();
    }
  }
  onFormCancel() {
    this.formGroup.reset();
  }
  DataGetOneContent() {
    if (this.ContentId <= 0) {
      var title = "برروز خطا ";
      var message = "ردیف اطلاعات جهت ویرایش مشخص نیست";
      this.toastrService.toastr.error(message, title);
      return;
    }

    this.formInfo.formAlert = "در دریافت ارسال اطلاعات از سرور";
    this.formInfo.formError = "";
    this.smsMainApiPathService
      .ServiceGetOneById(this.ContentId)
      .subscribe(
        (next) => {
          this.dataModel = next.Item;

          if (next.IsSuccess) {
            this.dataModel = next.Item;
            this.formInfo.formAlert = "";
          } else {
            var title = "برروز خطا ";
            var message = next.ErrorMessage;
            this.toastrService.toastr.error(message, title);
          }
        },
        (error) => {
          var title = "برروی خطا در دریافت اطلاعات";
          var message = this.publicHelper.CheckError(error);
          this.toastrService.toastr.error(message, title);
        }
      );
  }
  DataEditContent() {
    if (this.ContentId <= 0) {
      var title = "برروز خطا ";
      var message = "ردیف اطلاعات جهت ویرایش مشخص نیست";
      this.toastrService.toastr.error(message, title);
      return;
    }

    this.formInfo.formAlert = "در حال ارسال اطلاعات به سرور";
    this.formInfo.formError = "";
    this.smsMainApiPathService
      .ServiceEdit(this.dataModel)
      .subscribe(
        (next) => {
          this.formInfo.formAllowSubmit = true;
          this.dataModelResult = next;
          if (next.IsSuccess) {
            this.formInfo.formAlert = "ثبت با موفقت انجام شد";
          } else {
            var title = "برروز خطا ";
            var message = next.ErrorMessage;
            this.toastrService.toastr.error(message, title);
          }
        },
        (error) => {
          this.formInfo.formAllowSubmit = true;

          var title = "برروی خطا در دریافت اطلاعات";
          var message = this.publicHelper.CheckError(error);
          this.toastrService.toastr.error(message, title);
        }
      );
  }
  setFocus($event) {
    $event.focus();
  }
}
