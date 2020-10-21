import { Component, OnInit, Input, ViewChild, ChangeDetectorRef } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { CoreEnumService } from "app/@cms/cmsService/core/coreEnum.service";
import { ToastrService } from "ngx-toastr";
import { PublicHelper } from "app/@cms/cmsCommon/helper/publicHelper";
import { ErrorExcptionResult } from "app/@cms/cmsModels/base/errorExcptionResult";
import { FormGroup } from "@angular/forms";
import { baseEntityCategory } from "app/@cms/cmsModels/base/baseEntityCategory";
import { NewsCategoryService } from 'app/@cms/cmsService/news/newsCategory.service';
import { FormInfoModel } from 'app/@cms/cmsModels/base/formInfoModel';
import { CmsToastrServiceService } from 'app/@cms/cmsService/_base/cmsToastrService.service';

@Component({
  selector: "app-news-category-edit",
  templateUrl: "./categoryEdit.component.html",
  styleUrls: ["./categoryEdit.component.scss"],
})
export class NewsCategoryEditComponent implements OnInit {
  @Input()
  set options(model: any) {
    this.dateModleInput = model;
  }
  get options(): any {
    return this.dateModleInput;
  }
  private dateModleInput: any;
   constructor(
    private changeDetectorRef: ChangeDetectorRef,

    private activatedRoute: ActivatedRoute,
    public coreEnumService: CoreEnumService,
    public newsCategoryService: NewsCategoryService,
    private toastrService: CmsToastrServiceService,
    private publicHelper: PublicHelper
  ) {

    this.coreEnumService.resultEnumRecordStatusObs.subscribe((vlaue) => {
      if (vlaue && vlaue.IsSuccess) this.coreEnumService.resultEnumRecordStatus = vlaue;
      this.coreEnumService.ServiceEnumRecordStatus() ;
    });

  }
  ngOnInit() {
    this.id = Number.parseInt(
      this.activatedRoute.snapshot.paramMap.get("id")
    );
    this.activatedRoute.queryParams.subscribe((params) => {
      // Defaults to 0 if no query param provided.
      this.id = +params["id"] || 0;
    });
    if (this.dateModleInput && this.dateModleInput.id) {
      this.id = this.dateModleInput.id;
    }
    this.DataGetOneContent()
  }
  loadingStatus = false; // add one more property
  ngAfterViewChecked() {
    let show = this.newsCategoryService.loadingStatus;
    if (show != this.loadingStatus) {
      this.loadingStatus = show;
      this.changeDetectorRef.detectChanges();
    }
  }

  dataModelResult: ErrorExcptionResult<
    baseEntityCategory<number>
  > = new ErrorExcptionResult<baseEntityCategory<number>>();
  dataModel: baseEntityCategory<number> = new baseEntityCategory<
    number
  >();
  id: number;
  @ViewChild("vform", { static: false }) formGroup: FormGroup;
  

  formInfo:FormInfoModel=new FormInfoModel();
  

  
  
  DataGetOneContent() {
    if (this.id <= 0) {
      var title = "برروز خطا ";
      var message = "ردیف اطلاعات جهت ویرایش مشخص نیست";
      this.toastrService.toastr.error(message, title);
      return;
    }

    this.formInfo.formAlert = "در دریافت ارسال اطلاعات از سرور";
    this.formInfo.formError = "";
    this.newsCategoryService
      .ServiceGetOneById(this.id)
      .subscribe(
        (next) => {
          
          this.dataModel = next.Item;
          if (next.IsSuccess) {
            this.formInfo.formAlert = "";
          } else {
            this.formInfo.formAlert = "برروز خطا";
            this.formInfo.formError = next.ErrorMessage;
          }
        },
        (error) => {
          this.toastrService.toastr.error(
            this.publicHelper.CheckError(error),
            "برروی خطا در دریافت اطلاعات"
          );
        }
      );
  }
  DataEditContent() {
    this.formInfo.formAlert = "در حال ارسال اطلاعات به سرور";
    this.formInfo.formError = "";
    this.newsCategoryService
      .ServiceEdit(this.dataModel)
      .subscribe(
        (next) => {
          this.formInfo.formAllowSubmit = true;
          this.dataModelResult = next;
          if (next.IsSuccess) {
            this.formInfo.formAlert = "ثبت با موفقت انجام شد";
          } else {
            this.formInfo.formAlert = "برروز خطا";
            this.formInfo.formError = next.ErrorMessage;
          }
        },
        (error) => {
          this.formInfo.formAllowSubmit = true;
          this.toastrService.toastr.error(
            this.publicHelper.CheckError(error),
            "برروی خطا در دریافت اطلاعات"
          );
        }
      );
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
}
