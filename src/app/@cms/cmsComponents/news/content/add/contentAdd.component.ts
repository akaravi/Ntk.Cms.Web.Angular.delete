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
  selector: "app-news-content-add",
  templateUrl: "./contentAdd.component.html",
  styleUrls: ["./contentAdd.component.scss"],
})
export class NewsContentAddComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private newsContentService: NewsContentService,
    public coreEnumService: CoreEnumService,
    private alertService: ToastrService,
    private publicHelper: PublicHelper
  ) {
    this.coreEnumService.resultEnumRecordStatusObs.subscribe((vlaue) => {
      if (vlaue && vlaue.IsSuccess)
        this.coreEnumService.resultEnumRecordStatus = vlaue;
      this.coreEnumService.ServiceEnumRecordStatus();
    });
  }
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
  //dataResultCoreEnum: ErrorExcptionResult<any> = new ErrorExcptionResult<any>();
  dataResultContent: ErrorExcptionResult<
    NewsContentModel
  > = new ErrorExcptionResult<NewsContentModel>();
  linkCategoryId: number;

  ngOnInit() {
    this.linkCategoryId = Number.parseInt(
      this.activatedRoute.snapshot.paramMap.get("id")
    );
    this.activatedRoute.queryParams.subscribe((params) => {
      // Defaults to 0 if no query param provided.
      this.linkCategoryId = +params["id"] || 0;
    });
    if (this.dateModleInput && this.dateModleInput.linkCategoryId) {
      this.linkCategoryId = this.dateModleInput.linkCategoryId;
    }
    //alert("helo Id:"+this.linkCategoryId)

    //this.DataGetAllCoreEnum();
  }
  // DataGetAllCoreEnum() {
  //   this.coreEnumService.ServiceEnumRecordStatus().subscribe(
  //     (next) => {
  //       if (next.IsSuccess) {
  //         this.dataResultCoreEnum = next;
  //       }
  //     },
  //     (error) => {
  //       this.alertService.error(
  //         this.publicHelper.CheckError(error),
  //         "برروی خطا در دریافت اطلاعات"
  //       );
  //     }
  //   );
  // }
  onFormSubmit() {
    if (this.formGroup.valid) {
      this.formInfo.formSubmitted = true;
      this.DataAddContent();
    }
  }
  onFormCancel() {
    this.formGroup.reset();
  }
  DataAddContent() {
    if (this.linkCategoryId <= 0) {
      this.alertService.error(
        "دسته بندی را مشخص کنید",
        "دسته بندی اطلاعات مشخص نیست"
      );
      return;
    }
    this.dataModelContent.linkCategoryId = this.linkCategoryId;
    this.formInfo.formAlert = "در حال ارسال اطلاعات به سرور";
    this.formInfo.formError = "";
    this.newsContentService
      .ServiceAdd<NewsContentModel>(this.dataModelContent)
      .subscribe(
        (next) => {
          this.formInfo.formSubmitted = next.IsSuccess;
          this.dataResultContent = next;
          if (next.IsSuccess) {
            this.formInfo.formAlert = "ثبت با موفقت انجام شد";
          } else {
            var title = "برروز خطا ";
            var message = next.ErrorMessage;
            this.alertService.error(message, title);
          }
        },
        (error) => {
          this.formInfo.formSubmitted = false;

          var title = "برروی خطا در دریافت اطلاعات";
          var message = this.publicHelper.CheckError(error);
          this.alertService.error(message, title);
        }
      );
  }
  setFocus($event) {
    $event.focus();
  }
}
