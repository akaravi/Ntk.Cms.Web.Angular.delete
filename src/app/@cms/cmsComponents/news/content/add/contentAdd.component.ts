import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {PublicHelper} from 'app/@cms/cmsCommon/helper/publicHelper';
import {CmsToastrService} from 'app/@cms/cmsService/base/cmsToastr.service';
import {CoreEnumService, EnumModel, ErrorExcptionResult, FormInfoModel, NewsContentModel, NewsContentService} from 'ntk-cms-api';

@Component({
    selector: 'app-news-content-add',
    templateUrl: './contentAdd.component.html',
    styleUrls: ['./contentAdd.component.scss'],
})
export class NewsContentAddComponent implements OnInit {

    @Input()
    set options(model: any) {
        this.dateModleInput = model;
    }
    get options(): any {
        return this.dateModleInput;
    }
    @ViewChild('vform', {static: false}) formGroup: FormGroup;
    private dateModleInput: any;
    formInfo: FormInfoModel = new FormInfoModel();
    dataModel: NewsContentModel = new NewsContentModel();
    dataModelResult: ErrorExcptionResult<NewsContentModel> = new ErrorExcptionResult<NewsContentModel>();
    linkCategoryId: number;
    loadingStatus = false; // add one more property
    dataModelEnumRecordStatusResult: ErrorExcptionResult<EnumModel> = new ErrorExcptionResult<EnumModel>();

    constructor(
        private activatedRoute: ActivatedRoute,
        public newsContentService: NewsContentService,
        public coreEnumService: CoreEnumService,
        private toastrService: CmsToastrService,
        private publicHelper: PublicHelper
    ) {
    }

    ngOnInit() {
        this.linkCategoryId = Number(
            this.activatedRoute.snapshot.paramMap.get('id')
        );
        this.activatedRoute.queryParams.subscribe((params) => {
            this.linkCategoryId = +params['id'] || 0;
        });
        if (this.dateModleInput && this.dateModleInput.linkCategoryId) {
            this.linkCategoryId = this.dateModleInput.linkCategoryId;
        }
        this.getEnumRecordStatus();
    }

    getEnumRecordStatus(): void {
        this.coreEnumService.ServiceEnumRecordStatus().subscribe((res) => {
            this.dataModelEnumRecordStatusResult = res;
        });
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

    DataAddContent() {
        if (this.linkCategoryId <= 0) {
            this.toastrService.toastr.error(
                'دسته بندی را مشخص کنید',
                'دسته بندی اطلاعات مشخص نیست'
            );
            return;
        }
        this.dataModel.LinkCategoryId = this.linkCategoryId;
        this.formInfo.FormAlert = 'در حال ارسال اطلاعات به سرور';
        this.formInfo.FormError = '';
        this.loadingStatus = true;
        this.newsContentService
            .ServiceAdd(this.dataModel)
            .subscribe(
                (next) => {
                    this.loadingStatus = false;
                    this.formInfo.FormAllowSubmit = !next.IsSuccess;
                    this.dataModelResult = next;
                    if (next.IsSuccess) {
                        this.formInfo.FormAlert = 'ثبت با موفقت انجام شد';
                    } else {
                        const title = 'برروز خطا ';
                        const message = next.ErrorMessage;
                        this.toastrService.toastr.error(message, title);
                    }
                },
                (error) => {
                    this.loadingStatus = false;
                    this.formInfo.FormAllowSubmit = true;

                    const title = 'برروی خطا در دریافت اطلاعات';
                    const message = this.publicHelper.CheckError(error);
                    this.toastrService.toastr.error(message, title);
                }
            );
    }

    setFocus($event) {
        $event.focus();
    }
}
