import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PublicHelper } from 'app/@cms/cmsCommon/helper/publicHelper';
import { CmsToastrServiceService } from 'app/@cms/cmsService/base/cmsToastrService.service';
import { CoreEnumService, EnumModel, ErrorExcptionResult, FormInfoModel, NewsContentModel, NewsContentService } from 'ntk-cms-api';

@Component({
  selector: 'app-news-content-edit',
  templateUrl: './contentEdit.component.html',
  styleUrls: ['./contentEdit.component.scss'],
})
export class NewsContentEditComponent implements OnInit {
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
  dataModel: NewsContentModel = new NewsContentModel();
  dataModelResult: ErrorExcptionResult<
    NewsContentModel
  > = new ErrorExcptionResult<NewsContentModel>();
  id: number;
  loadingStatus = false; // add one more property
  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    public newsContentService: NewsContentService,
    public coreEnumService: CoreEnumService,
    private toastrService: CmsToastrServiceService,
    private publicHelper: PublicHelper
  ) {
    //   this.coreEnumService.resultEnumRecordStatusObs.subscribe((vlaue) => {
    //     if (vlaue && vlaue.IsSuccess) {
    //       this.coreEnumService.resultEnumRecordStatus = vlaue;
    //     }
    //     this.coreEnumService.ServiceEnumRecordStatus();
    //   });
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
    this.DataGetOneContent();
    // alert("helo id:"+this.linkCategoryId)

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
      this.DataEditContent();
    }
  }
  onFormCancel() {
    this.formGroup.reset();
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
    this.newsContentService
      .ServiceGetOneById(this.id)
      .subscribe(
        (next) => {
          this.dataModel = next.Item;

          if (next.IsSuccess) {
            this.dataModel = next.Item;
            this.formInfo.formAlert = '';
          } else {
            const title = 'برروز خطا ';
            const message = next.ErrorMessage;
            this.toastrService.toastr.error(message, title);
          }
          this.loadingStatus = false;
        },
        (error) => {
          const title = 'برروی خطا در دریافت اطلاعات';
          const message = this.publicHelper.CheckError(error);
          this.toastrService.toastr.error(message, title);
          this.loadingStatus = false;
        }
      );
  }
  DataEditContent() {
    if (this.id <= 0) {
      const title = 'برروز خطا ';
      const message = 'ردیف اطلاعات جهت ویرایش مشخص نیست';
      this.toastrService.toastr.error(message, title);
      return;
    }

    this.formInfo.formAlert = 'در حال ارسال اطلاعات به سرور';
    this.formInfo.formError = '';
    this.loadingStatus = true;
    this.newsContentService
      .ServiceEdit(this.dataModel)
      .subscribe(
        (next) => {
          this.formInfo.formAllowSubmit = true;
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
  setFocus($event) {
    $event.focus();
  }
}
