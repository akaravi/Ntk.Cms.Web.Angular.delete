import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PublicHelper } from 'app/@cms/cmsCommon/helper/publicHelper';
import { ComponentOptionSmsMainApiPathModel } from 'app/@cms/cmsComponentModels/sms/componentOptionSmsMainApiPathModel';
import { CmsToastrServiceService } from 'app/@cms/cmsService/base/cmsToastrService.service';
import { CoreEnumService, ErrorExcptionResult, FormInfoModel, SmsMainApiPathModel, SmsMainApiPathService } from 'ntk-cms-api';


@Component({
  selector: 'app-sms-main-api-path-add',
  templateUrl: './smsMainApiPathAdd.component.html',
  styleUrls: ['./smsMainApiPathAdd.component.scss']
})
export class SmsMainApiPathAddComponent implements OnInit {
  @Input()
  set options(model: any) {
    this.dateModleInput = model;
  }
  get options(): any {
    return this.dateModleInput;
  }
  @ViewChild('vform', { static: false }) formGroup: FormGroup;
  private dateModleInput: any;
  optionsCategorySelect: ComponentOptionSmsMainApiPathModel = new ComponentOptionSmsMainApiPathModel();

  formInfo: FormInfoModel = new FormInfoModel();
  dataModel: SmsMainApiPathModel = new SmsMainApiPathModel();
  dataModelResult: ErrorExcptionResult<
  SmsMainApiPathModel
  > = new ErrorExcptionResult<SmsMainApiPathModel>();
  linkCategoryId: number;
  loadingStatus = false; // add one more property
  constructor(
    private activatedRoute: ActivatedRoute,
    public smsMainApiPathService: SmsMainApiPathService,
    public coreEnumService: CoreEnumService,
    private toastrService: CmsToastrServiceService,
    private publicHelper: PublicHelper
  ) {
    // this.coreEnumService.resultEnumRecordStatusObs.subscribe((vlaue) => {
    //   if (vlaue && vlaue.IsSuccess) {
    //     this.coreEnumService.resultEnumRecordStatus = vlaue;
    //   }
    //   this.coreEnumService.ServiceEnumRecordStatus();
    // });
  }

  ngOnInit() {
    this.optionsCategorySelect.actions = {
      onActionSelect: (x) => this.onActionCategorySelect(x),
    };
    this.linkCategoryId = Number(
      this.activatedRoute.snapshot.paramMap.get('id')
    );
    this.activatedRoute.queryParams.subscribe((params) => {
      // Defaults to 0 if no query param provided.
      this.linkCategoryId = +params['id'] || 0;
    });
    if (this.dateModleInput && this.dateModleInput.linkCategoryId) {
      this.linkCategoryId = this.dateModleInput.linkCategoryId;
    }
    // this.smsMainApiPathService.cmsloadingObs.subscribe((vlaue) => {
    //   this.loadingStatus = vlaue;
    // });
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
        'دسته بندی را مشخص کنید',
        'دسته بندی اطلاعات مشخص نیست'
      );
      return;
    }
    this.dataModel.linkApiPathCompanyid = this.linkCategoryId;
    this.formInfo.formAlert = 'در حال ارسال اطلاعات به سرور';
    this.formInfo.formError = '';
    this.loadingStatus = true;
    this.smsMainApiPathService
      .ServiceAdd(this.dataModel)
      .subscribe(
        (next) => {
          this.formInfo.formAllowSubmit = !next.IsSuccess;
          this.dataModelResult = next;
          if (next.IsSuccess) {
            this.formInfo.formAlert = 'ثبت با موفقت انجام شد';
          } else {
            const title = 'برروز خطا ';
            const message = next.ErrorMessage;
            this.toastrService.toastr.error(message, title);
          }
          this.loadingStatus = false;
        },
        (error) => {
          this.formInfo.formAllowSubmit = true;

          const title = 'برروی خطا در دریافت اطلاعات';
          const message = this.publicHelper.CheckError(error);
          this.toastrService.toastr.error(message, title);
          this.loadingStatus = false;
        }
      );
  }

  onActionCategorySelect(model: SmsMainApiPathModel) {
    if (model && model.Id > 0) {


      const Title = this.dataModel.title;
      const Description = this.dataModel.description;
      const RecordStatus = this.dataModel.RecordStatus;
      this.dataModel = Object.assign({}, model); ;

      this.dataModel.title = Title;
      this.dataModel.description = Description;
      this.dataModel.RecordStatus = RecordStatus;

    }
  }
  setFocus($event) {
    $event.focus();
  }
}
