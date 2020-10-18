import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { PublicHelper } from "app/@cms/cmsCommon/helper/publicHelper";
import { ErrorExcptionResult } from "app/@cms/cmsModels/base/errorExcptionResult";
import { FormInfoModel } from "app/@cms/cmsModels/base/formInfoModel";
import { NewsContentModel } from "app/@cms/cmsModels/news/newsContentModel";
import { CoreEnumService } from "app/@cms/cmsService/core/coreEnum.service";
import { NewsContentService } from "app/@cms/cmsService/news/newsContent.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-news-content-edit",
  templateUrl: "./contentEdit.component.html",
  styleUrls: ["./contentEdit.component.scss"],
})
export class NewsContentEditComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private newsContentService: NewsContentService,
    private coreEnumService: CoreEnumService,
    private alertService: ToastrService,
    private publicHelper: PublicHelper
  ) {}
  @ViewChild("vform", { static: false }) formGroup: FormGroup;
  @Input()
  set options(model: any) {
    this.dateModleInput = model;
  }
  get options(): any {
    return this.dateModleInput;
  }
  private dateModleInput: any;
  formInfo: FormInfoModel = new FormInfoModel();
  dataModelContent: NewsContentModel = new NewsContentModel();
  dataResultCoreEnum: ErrorExcptionResult<any> = new ErrorExcptionResult<any>();
  dataResultContent: ErrorExcptionResult<
    NewsContentModel
  > = new ErrorExcptionResult<NewsContentModel>();
  ContentId: number;

  ngOnInit() {
    this.ContentId = Number.parseInt(
      this.activatedRoute.snapshot.paramMap.get("id")
    );
    this.activatedRoute.queryParams.subscribe((params) => {
      // Defaults to 0 if no query param provided.
      this.ContentId = +params["id"] || 0;
    });
    if (this.dateModleInput && this.dateModleInput.ContentId) {
      this.ContentId = this.dateModleInput.ContentId;
    }
    this.DataGetOneContent();
    //alert("helo Id:"+this.linkCategoryId)

    this.DataGetAllCoreEnum();
  }
  DataGetAllCoreEnum() {
    this.coreEnumService.ServiceEnumRecordStatus().subscribe(
      (next) => {
        if (next.IsSuccess) {
          this.dataResultCoreEnum = next;
        }
      },
      (error) => {
        this.alertService.error(
          this.publicHelper.CheckError(error),
          "برروی خطا در دریافت اطلاعات"
        );
      }
    );
  }
  onFormSubmit() {
    if (this.formGroup.valid) {
      this.formInfo.formSubmitted = true;
      this.DataEditContent();
    }
  }
  onFormCancel() {
    this.formGroup.reset();
  }
  DataGetOneContent() {
    if (this.ContentId <= 0) {
      var title = "برروز خطا ";
      var message = "ردیف اطلاعات جهت ویرایش مسخص نیست";
      this.alertService.error(message, title);
      return;
    }

    this.formInfo.formAlert = "در دریافت ارسال اطلاعات از سرور";
    this.formInfo.formError = "";
    this.newsContentService
      .ServiceGetOneById<NewsContentModel>(this.ContentId)
      .subscribe(
        (next) => {
          
          this.dataResultContent = next;
          
          if (next.IsSuccess) {
            this.dataModelContent=next.Item;
            this.formInfo.formAlert = "";
          } else {
            var title = "برروز خطا ";
            var message =next.ErrorMessage;
            this.alertService.error(message, title);
          }
        },
        (error) => {
          
          
          var title = "برروی خطا در دریافت اطلاعات";
          var message =this.publicHelper.CheckError(error);
          this.alertService.error(message, title);
        }
      );
  }
  DataEditContent() {
    if (this.ContentId <= 0) {
      var title = "برروز خطا ";
      var message = "ردیف اطلاعات جهت ویرایش مسخص نیست";
      this.alertService.error(message, title);
      return;
    }

    this.formInfo.formAlert = "در حال ارسال اطلاعات به سرور";
    this.formInfo.formError = "";
    this.newsContentService
      .ServiceEdit<NewsContentModel>(this.dataModelContent)
      .subscribe(
        (next) => {
          //this.formInfo.formSubmitted = next.IsSuccess;
          this.dataResultContent = next;
          if (next.IsSuccess) {
            this.formInfo.formAlert = "ثبت با موفقت انجام شد";
          } else {
            var title = "برروز خطا ";
            var message =next.ErrorMessage;
            this.alertService.error(message, title);
          }
        },
        (error) => {
          this.formInfo.formSubmitted = false;
         
          var title = "برروی خطا در دریافت اطلاعات";
          var message =this.publicHelper.CheckError(error);
          this.alertService.error(message, title);
        }
      );
  }
  setFocus($event) {
    $event.focus();
  }
}
