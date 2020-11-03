import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PublicHelper } from 'app/@cms/cmsCommon/helper/publicHelper';
import { CmsToastrService } from 'app/@cms/cmsService/base/cmsToastr.service';
import { CoreEnumService, EnumModel, ErrorExcptionResult, FormInfoModel, NewsContentModel, NewsContentService } from 'ntk-cms-api';

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
  @ViewChild('vform', { static: false }) formGroup: FormGroup;
  private dateModleInput: any;
  formInfo: FormInfoModel = new FormInfoModel();
  dataModel: NewsContentModel = new NewsContentModel();
  dataModelResult: ErrorExcptionResult<
    NewsContentModel
  > = new ErrorExcptionResult<NewsContentModel>();
  linkCategoryId: number;
  loadingStatus = false; // add one more property
  constructor(
    private activatedRoute: ActivatedRoute,
    public newsContentService: NewsContentService,
    public coreEnumService: CoreEnumService,
    private toastrService: CmsToastrService,
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
    // alert("helo Id:"+this.linkCategoryId)

    // this.DataGetAllCoreEnum();
    this.getEnumRecordStatus();
  }
  dataModelEnumRecordStatusResult: ErrorExcptionResult<EnumModel> = new ErrorExcptionResult<EnumModel>();

  getEnumRecordStatus(): void {
    this.coreEnumService.ServiceEnumRecordStatus().subscribe((res) => {
      this.dataModelEnumRecordStatusResult = res;
    });
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
    this.dataModel.linkCategoryId = this.linkCategoryId;
    this.formInfo.formAlert = 'در حال ارسال اطلاعات به سرور';
    this.formInfo.formError = '';
    this.loadingStatus = true;
    this.newsContentService
      .ServiceAdd(this.dataModel)
      .subscribe(
        (next) => {
          this.loadingStatus = false;
          this.formInfo.formAllowSubmit = !next.IsSuccess;
          this.dataModelResult = next;
          if (next.IsSuccess) {
            this.formInfo.formAlert = 'ثبت با موفقت انجام شد';
          } else {
            const title = 'برروز خطا ';
            const message = next.ErrorMessage;
            this.toastrService.toastr.error(message, title);
          }
        },
        (error) => {
          this.loadingStatus = false;
          this.formInfo.formAllowSubmit = true;

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
