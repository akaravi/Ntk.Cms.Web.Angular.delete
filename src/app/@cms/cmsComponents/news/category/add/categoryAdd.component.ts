import { NewsCategoryModel, CoreEnumService, EnumModel, ErrorExcptionResult, FormInfoModel, NewsCategoryService } from 'ntk-cms-api';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PublicHelper } from 'app/@cms/cmsCommon/helper/publicHelper';
import { FormGroup } from '@angular/forms';
import { CmsToastrService } from 'app/@cms/cmsService/base/cmsToastr.service';


@Component({
  selector: 'app-news-category-add',
  templateUrl: './categoryAdd.component.html',
  styleUrls: ['./categoryAdd.component.scss'],
})
export class NewsCategoryAddComponent implements OnInit {
  dataModelEnumRecordStatusResult: ErrorExcptionResult<EnumModel> = new ErrorExcptionResult<EnumModel>();

  @Input()
  set options(model: any) {
    this.dateModleInput = model;
  }
  get options(): any {
    return this.dateModleInput;
  }
  private dateModleInput: any;
  dataModelResultCategory: ErrorExcptionResult<NewsCategoryModel> = new ErrorExcptionResult<NewsCategoryModel>();
  dataModelCategory: NewsCategoryModel = new NewsCategoryModel();
  parentId: number;
  @ViewChild('vform', { static: false }) formGroup: FormGroup;


  formInfo: FormInfoModel = new FormInfoModel();
  loadingStatus = false; // add one more property
  constructor(
    private activatedRoute: ActivatedRoute,
    public coreEnumService: CoreEnumService,
    public newsCategoryService: NewsCategoryService,
    private toastrService: CmsToastrService,
    private publicHelper: PublicHelper
  ) {
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
    this.getEnumRecordStatus();
  }

  getEnumRecordStatus(): void {
    this.coreEnumService.ServiceEnumRecordStatus().subscribe((res) => {
      this.dataModelEnumRecordStatusResult = res;
    });
  }


  DataAddContent() {
    if (this.parentId > 0) { this.dataModelCategory.LinkParentId = this.parentId; }
    this.formInfo.FormAlert = 'در حال ارسال اطلاعات به سرور';
    this.formInfo.FormError = '';
    this.loadingStatus = true;
    this.newsCategoryService
      .ServiceAdd(this.dataModelCategory)
      .subscribe(
        (next) => {
          this.loadingStatus = false;
          this.formInfo.FormAllowSubmit = !next.IsSuccess;
          this.dataModelResultCategory = next;
          if (next.IsSuccess) {
          this.formInfo.FormAlert = 'ثبت با موفقت انجام شد';
          } else {
          this.formInfo.FormAlert = 'برروز خطا';
          this.formInfo.FormError = next.ErrorMessage;
          }
        },
        (error) => {
          this.loadingStatus = false;
          this.formInfo.FormAllowSubmit = true;
          this.toastrService.toastr.error(
            this.publicHelper.CheckError(error),
            'برروی خطا در دریافت اطلاعات'
          );
        }
      );
  }
  onFormSubmit() {
    if (this.formGroup.valid) {
      this.formInfo.FormAllowSubmit = false;
      this.DataAddContent();
    }
  }
  onFormCancel() {
    this.formGroup.reset();
  }
}
