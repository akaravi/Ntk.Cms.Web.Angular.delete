import { BaseEntityCategory, CoreEnumService, EnumModel, ErrorExcptionResult, FormInfoModel, NewsCategoryService } from 'ntk-cms-api';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PublicHelper } from 'app/@cms/cmsCommon/helper/publicHelper';
import { FormGroup } from '@angular/forms';
import { CmsToastrServiceService } from 'app/@cms/cmsService/base/cmsToastrService.service';


@Component({
  selector: 'app-news-category-add',
  templateUrl: './categoryAdd.component.html',
  styleUrls: ['./categoryAdd.component.scss'],
})
export class NewsCategoryAddComponent implements OnInit {
  @Input()
  set options(model: any) {
    this.dateModleInput = model;
  }
  get options(): any {
    return this.dateModleInput;
  }
  private dateModleInput: any;
  // dataModelResultCoreEnum: ErrorExcptionResult<any> = new ErrorExcptionResult<any>();
  dataModelResultCategory: ErrorExcptionResult<
    BaseEntityCategory<number>
  > = new ErrorExcptionResult<BaseEntityCategory<number>>();
  dataModelCategory: BaseEntityCategory<number> = new BaseEntityCategory<
    number
  >();
  parentId: number;
  @ViewChild('vform', { static: false }) formGroup: FormGroup;


  formInfo: FormInfoModel = new FormInfoModel();
  loadingStatus = false; // add one more property
  constructor(
    private activatedRoute: ActivatedRoute,
    public coreEnumService: CoreEnumService,
    public newsCategoryService: NewsCategoryService,
    private toastrService: CmsToastrServiceService,
    private publicHelper: PublicHelper
  ) {

    // this.coreEnumService.resultEnumRecordStatusObs.subscribe((vlaue) => {
    //   if (vlaue && vlaue.IsSuccess) { this.coreEnumService.resultEnumRecordStatus = vlaue; }
    //   this.coreEnumService.ServiceEnumRecordStatus() ;
    // });

  }

  ngOnInit() {
    this.parentId = Number(
      this.activatedRoute.snapshot.paramMap.get('id')
    );
    this.activatedRoute.queryParams.subscribe((params) => {
      // Defaults to 0 if no query param provided.
      this.parentId = +params['id'] || 0;
    });
    if (this.dateModleInput && this.dateModleInput.parentId) {
      this.parentId = this.dateModleInput.parentId;
    }
    // alert("helo Id:"+this.parentId)
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
    if (this.parentId > 0) { this.dataModelCategory.LinkParentId = this.parentId; }
    this.formInfo.formAlert = 'در حال ارسال اطلاعات به سرور';
    this.formInfo.formError = '';
    this.loadingStatus = true;
    this.newsCategoryService
      .ServiceAdd(this.dataModelCategory)
      .subscribe(
        (next) => {
          this.loadingStatus = false;
          this.formInfo.formAllowSubmit = !next.IsSuccess;
          this.dataModelResultCategory = next;
          if (next.IsSuccess) {
          this.formInfo.formAlert = 'ثبت با موفقت انجام شد';
          } else {
          this.formInfo.formAlert = 'برروز خطا';
          this.formInfo.formError = next.ErrorMessage;
          }
        },
        (error) => {
          this.loadingStatus = false;
          this.formInfo.formAllowSubmit = true;
          this.toastrService.toastr.error(
            this.publicHelper.CheckError(error),
            'برروی خطا در دریافت اطلاعات'
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
