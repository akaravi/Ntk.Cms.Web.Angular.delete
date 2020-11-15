import {Component, OnInit, Input, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PublicHelper} from 'app/@cms/cmsCommon/helper/publicHelper';

import {FormGroup} from '@angular/forms';
import {CoreEnumService, ErrorExcptionResult, FilterModel, FormInfoModel, NewsCategoryModel, NewsCategoryService} from 'ntk-cms-api';
import {CmsToastrService} from 'app/@cms/cmsService/base/cmsToastr.service';

@Component({
    selector: 'app-news-category-delete',
    templateUrl: './categoryDelete.component.html',
    styleUrls: ['./categoryDelete.component.scss'],
})
export class NewsCategoryDeleteComponent implements OnInit {

    dataModel: any = {};
    @ViewChild('vform', {static: false}) formGroup: FormGroup;
    formInfo: FormInfoModel = new FormInfoModel();
    id: any;
    private dateModleInput: any;
    dataModelResultCategory: ErrorExcptionResult<NewsCategoryModel> = new ErrorExcptionResult<NewsCategoryModel>();
    dataModelResultCategoryAllData: ErrorExcptionResult<NewsCategoryModel> = new ErrorExcptionResult<NewsCategoryModel>();
    @Input()
    set options(model: any) {
        this.dateModleInput = model;
    }

    get options(): any {
        return this.dateModleInput;
    }

    constructor(
        private activatedRoute: ActivatedRoute,
        private coreEnumService: CoreEnumService,
        private newsCategoryService: NewsCategoryService,
        private toastrService: CmsToastrService,
        private publicHelper: PublicHelper
    ) {
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
        if (!this.id || this.id === 0) {
            this.formInfo.FormAlert = 'برروز خطا';
            this.formInfo.FormError = 'شناسه دسته بندی مشخص نمی باشد';
            this.formInfo.DisabledButtonSubmitted = true;
            return;
        }
        this.DataGetOne();
        this.DataGetAll();
    }

    DataGetOne() {

        this.formInfo.FormAlert = 'در حال لود اطلاعات';
        this.newsCategoryService
            .ServiceGetOneById(this.id)
            .subscribe(
                (next) => {
                    this.dataModelResultCategory = next;
                    if (!next.IsSuccess) {
                        this.formInfo.FormAlert = 'برروز خطا';
                        this.formInfo.FormError = next.ErrorMessage;
                        this.formInfo.FormErrorStatus = true;
                    } else {
                        this.formInfo.FormAlert = '';
                    }
                },
                (error) => {
                    this.formInfo.FormAlert = 'برروز خطا';
                    this.formInfo.FormErrorStatus = true;
                    this.toastrService.toastr.error(
                        this.publicHelper.CheckError(error),
                        'برروی خطا در دریافت اطلاعات'
                    );
                }
            );

    }

    DataGetAll() {

        this.formInfo.FormAlert = 'در حال لود اطلاعات';
        const filterModel: FilterModel = new FilterModel();
        filterModel.RowPerPage = 100;
        this.newsCategoryService
            .ServiceGetAll(filterModel)
            .subscribe(
                (next) => {
                    this.dataModelResultCategoryAllData = next;
                    if (!next.IsSuccess) {
                        this.formInfo.FormAlert = 'برروز خطا';
                        this.formInfo.FormError = next.ErrorMessage;
                        this.formInfo.FormErrorStatus = true;
                    } else {
                        this.formInfo.FormAlert = '';
                    }
                },
                (error) => {
                    this.formInfo.FormAlert = 'برروز خطا';
                    this.formInfo.FormErrorStatus = true;
                    this.toastrService.toastr.error(
                        this.publicHelper.CheckError(error),
                        'برروی خطا در دریافت اطلاعات'
                    );
                }
            );

    }

    onFormMove() {
        if (this.formGroup.valid) {
            this.formInfo.FormAllowSubmit = true;
            if (this.dataModel.NewCatId === this.id) {
                this.formInfo.FormAlert = 'برروز خطا';
                this.formInfo.FormError =
                    'شناسه دسته بندی در حال حذف با دسته بندی جایگزین یکسان است';
                this.formInfo.DisabledButtonSubmitted = false;
            }
            this.DataMove();
        }
    }

    onFormDelete() {
        if (this.formGroup.valid) {
            this.formInfo.FormAllowSubmit = false;
            this.DataDelete();
        }
    }

    onFormChangeNewCatId() {
        if (this.dataModel.NewCatId === this.id) {
            this.formInfo.FormAlert = 'برروز خطا';
            this.formInfo.FormError =
                'شناسه دسته بندی در حال حذف با دسته بندی جایگزین یکسان است';
            this.formInfo.DisabledButtonSubmitted = true;
        } else {
            this.formInfo.DisabledButtonSubmitted = false;
            this.formInfo.FormError = '';
        }
    }

    DataDelete() {
        this.formInfo.DisabledButtonSubmitted = true;

        this.newsCategoryService
            .ServiceDelete(this.id)
            .subscribe(
                (next) => {
                    this.formInfo.FormAllowSubmit = !next.IsSuccess;
                    if (!next.IsSuccess) {
                        this.formInfo.FormAlert = 'برروز خطا';
                        this.formInfo.FormError = next.ErrorMessage;

                    } else {
                        this.formInfo.FormAlert = 'حذف با موفقیت انجام شد';
                    }
                    this.formInfo.DisabledButtonSubmitted = false;

                },
                (error) => {
                    this.formInfo.FormAlert = 'برروز خطا';
                    this.formInfo.FormAllowSubmit = true;
                    this.toastrService.toastr.error(
                        this.publicHelper.CheckError(error),
                        'برروی خطا در دریافت اطلاعات'
                    );
                    this.formInfo.DisabledButtonSubmitted = false;

                }
            );
    }

    DataMove() {
        this.formInfo.DisabledButtonSubmitted = true;
        this.newsCategoryService
            .ServiceMove(this.id, this.dataModel.NewCatId)
            .subscribe(
                (next) => {
                    if (!next.IsSuccess) {
                        this.formInfo.FormAlert = 'برروز خطا';
                        this.formInfo.FormError = next.ErrorMessage;
                    } else {
                        this.formInfo.FormAlert = 'جابجایی با موفقیت انجام شد';
                    }
                    this.formInfo.FormAllowSubmit = false;
                    this.formInfo.DisabledButtonSubmitted = false;
                },
                (error) => {
                    this.formInfo.FormAlert = 'برروز خطا';
                    this.toastrService.toastr.error(
                        this.publicHelper.CheckError(error),
                        'برروی خطا در دریافت اطلاعات'
                    );
                    this.formInfo.DisabledButtonSubmitted = false;
                    this.formInfo.FormAllowSubmit = true;
                }
            );
    }

}
