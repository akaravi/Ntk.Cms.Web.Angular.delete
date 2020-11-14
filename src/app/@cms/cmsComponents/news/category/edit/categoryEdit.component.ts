import {CoreEnumService, EnumModel, ErrorExcptionResult, FormInfoModel, NewsCategoryModel, NewsCategoryService} from 'ntk-cms-api';
import {Component, OnInit, Input, ViewChild, ChangeDetectorRef} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {PublicHelper} from 'app/@cms/cmsCommon/helper/publicHelper';
import {FormGroup} from '@angular/forms';
import {CmsToastrService} from 'app/@cms/cmsService/base/cmsToastr.service';


@Component({
    selector: 'app-news-category-edit',
    templateUrl: './categoryEdit.component.html',
    styleUrls: ['./categoryEdit.component.scss'],
})
export class NewsCategoryEditComponent implements OnInit {

    @ViewChild('vform', {static: false}) formGroup: FormGroup;
    formInfo: FormInfoModel = new FormInfoModel();
    dataModelEnumRecordStatusResult: ErrorExcptionResult<EnumModel> = new ErrorExcptionResult<EnumModel>();
    dataModelResult: ErrorExcptionResult<NewsCategoryModel> = new ErrorExcptionResult<NewsCategoryModel>();
    dataModel: NewsCategoryModel = new NewsCategoryModel();
    id: number;

    @Input()
    set options(model: any) {
        this.dateModleInput = model;
    }

    get options(): any {
        return this.dateModleInput;
    }

    private dateModleInput: any;
    loadingStatus = false; // add one more property

    constructor(
        private changeDetectorRef: ChangeDetectorRef,
        private activatedRoute: ActivatedRoute,
        public coreEnumService: CoreEnumService,
        public newsCategoryService: NewsCategoryService,
        private toastrService: CmsToastrService,
        private publicHelper: PublicHelper
    ) {
    }

    ngOnInit() {
        this.id = Number(
            this.activatedRoute.snapshot.paramMap.get('id')
        );
        this.activatedRoute.queryParams.subscribe((params) => {
            // Defaults to 0 if no query param provided.
            this.id = +params['id'] || 0;
        });
        if (this.dateModleInput && this.dateModleInput.id) {
            this.id = this.dateModleInput.id;
        }
        this.DataGetOneContent()
        this.getEnumRecordStatus();
    }

    getEnumRecordStatus(): void {
        this.coreEnumService.ServiceEnumRecordStatus().subscribe((res) => {
            this.dataModelEnumRecordStatusResult = res;
        });
    }


    DataGetOneContent() {
        if (this.id <= 0) {
            const title = 'برروز خطا ';
            const message = 'ردیف اطلاعات جهت ویرایش مشخص نیست';
            this.toastrService.toastr.error(message, title);
            return;
        }

        this.formInfo.FormAlert = 'در دریافت ارسال اطلاعات از سرور';
        this.formInfo.FormError = '';
        this.loadingStatus = true;
        this.newsCategoryService
            .ServiceGetOneById(this.id)
            .subscribe(
                (next) => {

                    this.dataModel = next.Item;
                    if (next.IsSuccess) {
                        this.formInfo.FormAlert = '';
                    } else {
                        this.formInfo.FormAlert = 'برروز خطا';
                        this.formInfo.FormError = next.ErrorMessage;
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
        this.formInfo.FormAlert = 'در حال ارسال اطلاعات به سرور';
        this.formInfo.FormError = '';
        this.loadingStatus = true;
        this.newsCategoryService
            .ServiceEdit(this.dataModel)
            .subscribe(
                (next) => {
                    this.formInfo.FormAllowSubmit = true;
                    this.dataModelResult = next;
                    if (next.IsSuccess) {
                        this.formInfo.FormAlert = 'ثبت با موفقت انجام شد';
                    } else {
                        this.formInfo.FormAlert = 'برروز خطا';
                        this.formInfo.FormError = next.ErrorMessage;
                    }
                    this.loadingStatus = false;
                },
                (error) => {
                    this.formInfo.FormAllowSubmit = true;
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
            this.formInfo.FormAllowSubmit = false;
            this.DataEditContent();
        }
    }

    onFormCancel() {
        this.formGroup.reset();
    }
}
