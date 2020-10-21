import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PublicHelper } from 'app/@cms/cmsCommon/helper/publicHelper';
import { ComponentOptionModel } from 'app/@cms/cmsModels/base/componentOptionModel';
import { ErrorExcptionResult } from 'app/@cms/cmsModels/base/errorExcptionResult';
import { FormInfoModel } from 'app/@cms/cmsModels/base/formInfoModel';
import { SmsMainApiPathModel } from 'app/@cms/cmsModels/sms/smsMainApiPathModel';
import { CoreEnumService } from 'app/@cms/cmsService/core/coreEnum.service';
import { SmsMainApiPathService } from 'app/@cms/cmsService/sms/smsMainApiPath.service';
import { CmsToastrServiceService } from 'app/@cms/cmsService/_base/cmsToastrService.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sms-main-api-path-add',
  templateUrl: './smsMainApiPathAdd.component.html',
  styleUrls: ['./smsMainApiPathAdd.component.scss']
})
export class SmsMainApiPathAddComponent implements OnInit {
  @ViewChild("vform", { static: false }) formGroup: FormGroup;
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
  optionsCategorySelect: ComponentOptionModel = new ComponentOptionModel();
  optionsCategorySelectData = null;

  formInfo: FormInfoModel = new FormInfoModel();
  dataModel: SmsMainApiPathModel = new SmsMainApiPathModel();
  dataModelResult: ErrorExcptionResult<
  SmsMainApiPathModel
  > = new ErrorExcptionResult<SmsMainApiPathModel>();
  linkCategoryId: number;

  ngOnInit() {
    this.optionsCategorySelect.actions = {
      onActionSelect: (x) => this.onActionCategorySelect(x),
    };
    this.linkCategoryId = Number.parseInt(
      this.activatedRoute.snapshot.paramMap.get("id")
    );
    this.activatedRoute.queryParams.subscribe((params) => {
      // Defaults to 0 if no query param provided.
      this.linkCategoryId = +params["id"] || 0;
    });
    if (this.dateModleInput && this.dateModleInput.linkCategoryId) {
      this.linkCategoryId = this.dateModleInput.linkCategoryId;
    }
    // this.smsMainApiPathService.cmsloadingObs.subscribe((vlaue) => {
    //   this.loadingStatus = vlaue;
    // });
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
      this.DataAddContent();
    }
  }
  onFormCancel() {
    this.formGroup.reset();
  }
  DataAddContent() {
    if (this.linkCategoryId <= 0) {
      this.toastrService.toastr.error(
        "دسته بندی را مشخص کنید",
        "دسته بندی اطلاعات مشخص نیست"
      );
      return;
    }
    this.dataModel.LinkApiPathCompanyId = this.linkCategoryId;
    this.formInfo.formAlert = "در حال ارسال اطلاعات به سرور";
    this.formInfo.formError = "";
    this.smsMainApiPathService
      .ServiceAdd(this.dataModel)
      .subscribe(
        (next) => {
          this.formInfo.formAllowSubmit = !next.IsSuccess;
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

  onActionCategorySelect(model: any) {
    if (model && model.data) {
      this.optionsCategorySelectData=model.data;

      let Title=this.dataModel.Title;
      let Description=this.dataModel.Description;
      let RecordStatus=this.dataModel.RecordStatus;
      this.dataModel= Object.assign({}, model.data);;

      this.dataModel.Title=Title;
      this.dataModel.Description=Description;
      this.dataModel.RecordStatus=RecordStatus;

    }
  }
  setFocus($event) {
    $event.focus();
  }
}
