import { Component, OnInit, Input, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CoreEnumService } from 'app/@cms/cmsService/core/coreEnum.service';
import { ToastrService } from 'ngx-toastr';
import { PublicHelper } from 'app/@cms/cmsCommon/helper/publicHelper';
import { ErrorExcptionResult } from 'app/@cms/cmsModels/base/errorExcptionResult';
import { FormGroup } from '@angular/forms';
import { BaseEntityCategory } from 'app/@cms/cmsModels/base/baseEntityCategory';
import { NewsCategoryService } from 'app/@cms/cmsService/news/newsCategory.service';
import { FormInfoModel } from 'app/@cms/cmsModels/base/formInfoModel';
import { SmsMainApiPathCompanyService } from 'app/@cms/cmsService/sms/smsMainApiPathCompany.service';
import { SmsMainApiPathCompanyModel } from 'app/@cms/cmsModels/sms/smsMainApiCompanyModel';
import { CmsToastrServiceService } from 'app/@cms/cmsService/_base/cmsToastrService.service';

@Component({
  selector: 'app-sms-main-api-path-company-edit',
  templateUrl: './smsMainApiPathCompanyEdit.component.html',
  styleUrls: ['./smsMainApiPathCompanyEdit.component.scss'],
})
export class SmsMainApiPathCompanyEditComponent implements OnInit {

  @Input()
  set options(model: any) {
    this.dateModleInput = model;
  }
  get options(): any {
    return this.dateModleInput;
  }
  @ViewChild('vform', { static: false })
  formGroup: FormGroup;
  private dateModleInput: any;
  formInfo: FormInfoModel = new FormInfoModel();
  id: number;
  loadingStatus = false; // add one more property

  dataModel: SmsMainApiPathCompanyModel = new SmsMainApiPathCompanyModel();
  dataModelResult: ErrorExcptionResult<SmsMainApiPathCompanyModel> = new ErrorExcptionResult<
    SmsMainApiPathCompanyModel
  >();
  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    public coreEnumService: CoreEnumService,
    public smsMainApiPathCompanyService: SmsMainApiPathCompanyService,
    private toastrService: CmsToastrServiceService,
    private publicHelper: PublicHelper
  ) {
    this.coreEnumService.resultEnumRecordStatusObs.subscribe((vlaue) => {
      if (vlaue && vlaue.IsSuccess) { this.coreEnumService.resultEnumRecordStatus = vlaue; }
      this.coreEnumService.ServiceEnumRecordStatus();
    });
  }
  ngOnInit() {
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.activatedRoute.queryParams.subscribe((params) => {
      // Defaults to 0 if no query param provided.
      this.id = +params['id'] || 0;
    });
    if (this.dateModleInput && this.dateModleInput.id) {
      this.id = this.dateModleInput.id;
    }
    this.DataGetOneContent();
  }



  DataGetOneContent() {
    if (this.id <= 0) {
      const title = 'برروز خطا ';
      const message = 'ردیف اطلاعات جهت ویرایش مشخص نیست';
      this.toastrService.toastr.error(message, title);
      return;
    }

    this.formInfo.formAlert = 'در دریافت ارسال اطلاعات از سرور';
    this.formInfo.formError = '';
    this.loadingStatus = true;
    this.smsMainApiPathCompanyService
      .ServiceGetOneById(this.id)
      .subscribe(
        (next) => {

          this.dataModel = next.Item;
          if (next.IsSuccess) {
            this.formInfo.formAlert = '';
          } else {
            this.formInfo.formAlert = 'برروز خطا';
            this.formInfo.formError = next.ErrorMessage;
          }
          this.loadingStatus = false;
        },
        (error) => {
          this.toastrService.toastr.error(
            this.publicHelper.CheckError(error),
            'برروی خطا در دریافت اطلاعات'
          );
          this.loadingStatus = false;
        }
      );
  }
  DataEditContent() {
    this.formInfo.formAlert = 'در حال ارسال اطلاعات به سرور';
    this.formInfo.formError = '';
    this.loadingStatus = true;
    this.smsMainApiPathCompanyService
      .ServiceEdit(this.dataModel)
      .subscribe(
        (next) => {
          this.formInfo.formAllowSubmit = true;
          this.dataModelResult = next;
          if (next.IsSuccess) {
            this.formInfo.formAlert = 'ثبت با موفقت انجام شد';
          } else {
            this.formInfo.formAlert = 'برروز خطا';
            this.formInfo.formError = next.ErrorMessage;
          }
          this.loadingStatus = false;
        },
        (error) => {
          this.formInfo.formAllowSubmit = true;
          this.toastrService.toastr.error(
            this.publicHelper.CheckError(error),
            'برروی خطا در دریافت اطلاعات'
          );
          this.loadingStatus = false;
        }
      );
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
}
