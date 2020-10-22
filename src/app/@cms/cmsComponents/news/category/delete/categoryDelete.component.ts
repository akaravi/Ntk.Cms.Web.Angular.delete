import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoreEnumService } from 'app/@cms/cmsService/core/coreEnum.service';
import { NewsCategoryService } from 'app/@cms/cmsService/news/newsCategory.service';
import { ToastrService } from 'ngx-toastr';
import { PublicHelper } from 'app/@cms/cmsCommon/helper/publicHelper';
import { ErrorExcptionResult } from 'app/@cms/cmsModels/base/errorExcptionResult';
import { baseEntityCategory } from 'app/@cms/cmsModels/base/baseEntityCategory';
import { FormInfoModel } from 'app/@cms/cmsModels/base/formInfoModel';
import { FilterModel } from 'app/@cms/cmsModels/base/filterModel';
import { FormGroup } from '@angular/forms';
import { CmsToastrServiceService } from 'app/@cms/cmsService/_base/cmsToastrService.service';

@Component({
  selector: 'app-news-category-delete',
  templateUrl: './categoryDelete.component.html',
  styleUrls: ['./categoryDelete.component.scss'],
})
export class NewsCategoryDeleteComponent implements OnInit {

  @Input()
  set options(model: any) {
    this.dateModleInput = model;
  }
  get options(): any {
    return this.dateModleInput;
  }

  id: any;

  private dateModleInput: any;

  dataModelResultCategory: ErrorExcptionResult<
    baseEntityCategory<number>
  > = new ErrorExcptionResult<baseEntityCategory<number>>();
  dataModelResultCategoryAllData: ErrorExcptionResult<
    baseEntityCategory<number>
  > = new ErrorExcptionResult<baseEntityCategory<number>>();

  dataModel: any = {};
  @ViewChild('vform', { static: false }) formGroup: FormGroup;
  formInfo: FormInfoModel = new FormInfoModel();
  constructor(
    private activatedRoute: ActivatedRoute,
    private coreEnumService: CoreEnumService,
    private newsCategoryService: NewsCategoryService,
    private toastrService: CmsToastrServiceService,
    private publicHelper: PublicHelper
  ) {}
  ngOnInit() {
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.activatedRoute.queryParams.subscribe((params) => {
      // Defaults to 0 if no query param provided.
      this.id = +params['id'] || 0;
    });
    if (this.dateModleInput && this.dateModleInput.id) {
      this.id = this.dateModleInput.id;
    }
    if (!this.id || this.id === 0) {
      this.formInfo.formAlert = 'برروز خطا';
      this.formInfo.formError = 'شناسه دسته بندی مشخص نمی باشد';
      this.formInfo.disabledButtonSubmitted = true;
      return;
    }
    this.DataGetOne();
    this.DataGetAll();
  }

  DataGetOne() {

      this.formInfo.formAlert = 'در حال لود اطلاعات';
      this.newsCategoryService
        .ServiceGetOneById(this.id)
        .subscribe(
          (next) => {
            this.dataModelResultCategory = next;
            if (!next.IsSuccess) {
              this.formInfo.formAlert = 'برروز خطا';
              this.formInfo.formError = next.ErrorMessage;
              this.formInfo.formErrorStatus = true;
            } else { (!this.formInfo.formErrorStatus) }
            {
                this.formInfo.formAlert = '';
            }
          },
          (error) => {
            this.formInfo.formAlert = 'برروز خطا';
            this.formInfo.formErrorStatus = true;
            this.toastrService.toastr.error(
              this.publicHelper.CheckError(error),
              'برروی خطا در دریافت اطلاعات'
            );
          }
        );

  }
  DataGetAll() {

      this.formInfo.formAlert = 'در حال لود اطلاعات';
      const filterModel: FilterModel = new FilterModel();
      filterModel.RowPerPage = 100;
      this.newsCategoryService
        .ServiceGetAll(filterModel)
        .subscribe(
          (next) => {
            this.dataModelResultCategoryAllData = next;
            if (!next.IsSuccess) {
              this.formInfo.formAlert = 'برروز خطا';
              this.formInfo.formError = next.ErrorMessage;
              this.formInfo.formErrorStatus = true;
            } else { (!this.formInfo.formErrorStatus) }
            {
              this.formInfo.formAlert = '';
            }
          },
          (error) => {
            this.formInfo.formAlert = 'برروز خطا';
            this.formInfo.formErrorStatus = true;
            this.toastrService.toastr.error(
              this.publicHelper.CheckError(error),
              'برروی خطا در دریافت اطلاعات'
            );
          }
        );

  }
  onFormMove() {
    if (this.formGroup.valid) {
      this.formInfo.formAllowSubmit = true;
      if (this.dataModel.NewCatId === this.id) {
        this.formInfo.formAlert = 'برروز خطا';
        this.formInfo.formError =
          'شناسه دسته بندی در حال حذف با دسته بندی جایگزین یکسان است';
        this.formInfo.disabledButtonSubmitted = false;
      }
      this.DataMove();
    }
  }
  onFormDelete() {
    if (this.formGroup.valid) {
      this.formInfo.formAllowSubmit = false;
      this.DataDelete();
    }
  }
  onFormChangeNewCatId() {
    if (this.dataModel.NewCatId === this.id) {
      this.formInfo.formAlert = 'برروز خطا';
      this.formInfo.formError =
        'شناسه دسته بندی در حال حذف با دسته بندی جایگزین یکسان است';
      this.formInfo.disabledButtonSubmitted = true;
    } else {
    this.formInfo.disabledButtonSubmitted = false;
    this.formInfo.formError = '';
    }
  }
  DataDelete() {
    this.formInfo.disabledButtonSubmitted = true;

    this.newsCategoryService
      .ServiceDelete(this.id)
      .subscribe(
        (next) => {
          this.formInfo.formAllowSubmit = !next.IsSuccess;
          if (!next.IsSuccess) {
            this.formInfo.formAlert = 'برروز خطا';
            this.formInfo.formError = next.ErrorMessage;

          } else {
          this.formInfo.formAlert = 'حذف با موفقیت انجام شد';
          }
          this.formInfo.disabledButtonSubmitted = false;

        },
        (error) => {
          this.formInfo.formAlert = 'برروز خطا';
          this.formInfo.formAllowSubmit = true;
          this.toastrService.toastr.error(
            this.publicHelper.CheckError(error),
            'برروی خطا در دریافت اطلاعات'
          );
          this.formInfo.disabledButtonSubmitted = false;

        }
      );
  }
  DataMove() {
    this.formInfo.disabledButtonSubmitted = true;
    this.newsCategoryService
    .ServiceMove<baseEntityCategory<number>>(this.id, this.dataModel.NewCatId)
    .subscribe(
      (next) => {
        if (!next.IsSuccess) {
          this.formInfo.formAlert = 'برروز خطا';
          this.formInfo.formError = next.ErrorMessage;
        } else {
        this.formInfo.formAlert = 'جابجایی با موفقیت انجام شد';
        }
        this.formInfo.formAllowSubmit = false;
        this.formInfo.disabledButtonSubmitted = false;
      },
      (error) => {
        this.formInfo.formAlert = 'برروز خطا';
        this.toastrService.toastr.error(
          this.publicHelper.CheckError(error),
          'برروی خطا در دریافت اطلاعات'
        );
        this.formInfo.disabledButtonSubmitted = false;
        this.formInfo.formAllowSubmit = true;
      }
    );
  }

}
