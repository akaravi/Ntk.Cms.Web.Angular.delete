import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PublicHelper } from 'app/@cms/cmsCommon/helper/publicHelper';

import { FormGroup } from '@angular/forms';
import {
  CoreEnumService,
  EnumModel,
  ErrorExcptionResult,
  FormInfoModel,
  SmsMainApiPathCompanyModel,
  SmsMainApiPathCompanyService,
} from 'ntk-cms-api';
import { CmsToastrServiceService } from 'app/@cms/cmsService/base/cmsToastrService.service';

@Component({
  selector: 'app-sms-main-api-path-company-add',
  templateUrl: './smsMainApiPathCompanyAdd.component.html',
  styleUrls: ['./smsMainApiPathCompanyAdd.component.scss'],
})
export class SmsMainApiPathCompanyAddComponent implements OnInit {
  @Input()
  set options(model: any) {
    this.dateModleInput = model;
  }
  get options(): any {
    return this.dateModleInput;
  }
  loadingStatus = false; // add one more property
  private dateModleInput: any;
  dataModelResult: ErrorExcptionResult<
    SmsMainApiPathCompanyModel
  > = new ErrorExcptionResult<SmsMainApiPathCompanyModel>();
  dataModel: SmsMainApiPathCompanyModel = new SmsMainApiPathCompanyModel();

  @ViewChild('vform', { static: false }) formGroup: FormGroup;

  formInfo: FormInfoModel = new FormInfoModel();
  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    public coreEnumService: CoreEnumService,
    public smsMainApiPathCompanyService: SmsMainApiPathCompanyService,
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
    // this.DataGetAllCoreEnum();
    this.getEnumRecordStatus();
  }
  dataModelEnumRecordStatusResult: ErrorExcptionResult<EnumModel> = new ErrorExcptionResult<EnumModel>();

  getEnumRecordStatus(): void {
    this.coreEnumService.ServiceEnumRecordStatus().subscribe((res) => {
      this.dataModelEnumRecordStatusResult = res;
    });
  }

  DataAddContent() {
    this.formInfo.formAlert = 'در حال ارسال اطلاعات به سرور';
    this.formInfo.formError = '';
    this.loadingStatus = true;
    this.smsMainApiPathCompanyService.ServiceAdd(this.dataModel).subscribe(
      (next) => {
        this.formInfo.formAllowSubmit = !next.IsSuccess;
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
      this.DataAddContent();
    }
  }
  onFormCancel() {
    this.formGroup.reset();
  }
}
