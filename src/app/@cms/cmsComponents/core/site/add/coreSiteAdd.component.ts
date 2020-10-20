import { Component, OnInit, Input } from "@angular/core";
import { FormControl, FormGroup, Validators, NgForm } from "@angular/forms";
import { Subscription } from "rxjs";
import {
  FilterModel,
  FilterDataModel,
} from "app/@cms/cmsModels/base/filterModel";
import { ErrorExcptionResult } from "app/@cms/cmsModels/base/errorExcptionResult";
import { PublicHelper } from "app/@cms/cmsCommon/helper/publicHelper";
import { ToastrService } from "ngx-toastr";
import { CoreSiteService } from "../../../../cmsService/core/coreSite.service";
import { CoreSiteCategoryModuleService } from "../../../../cmsService/core/coreSiteCategoryModule.service";
import { CoreModuleService } from "../../../../cmsService/core/coreModule.service";
import { CoreSiteCategoryService } from "../../../../cmsService/core/coreSiteCategory.service";
import { CaptchaModel } from 'app/@cms/cmsModels/base/captchaModel';
import { CmsAuthService } from 'app/@cms/cmsService/core/auth.service';
import { CmsToastrServiceService } from 'app/@cms/cmsService/_base/cmsToastrService.service';

@Component({
  selector: "app-cms-site-add",
  templateUrl: "./coreSiteAdd.component.html",
  styleUrls: ["./coreSiteAdd.component.scss"],
})
export class CoreSiteAddComponent implements OnInit {
  subManager = new Subscription();
  filteModel = new FilterModel();
  dataModel: ErrorExcptionResult<any> = new ErrorExcptionResult<any>();
  dataModelLoad = false;
  dataModelDomains = [];
  dataModelModule: ErrorExcptionResult<any>;
  dataModelCategory: ErrorExcptionResult<any>;

  selectedDomain: any;
  captchaModel: CaptchaModel = new CaptchaModel();

  constructor(
    private toastrService: CmsToastrServiceService,
    private publicHelper: PublicHelper,
    private coreSiteService: CoreSiteService,
    private coreSiteCategoryModuleService: CoreSiteCategoryModuleService,
    private cmsAuthService: CmsAuthService,

    private coreModuleService: CoreModuleService,
    private coreSiteCategoryService: CoreSiteCategoryService
  ) {}

  private dateModleInput: any;

  @Input()
  set dateInput(model: any) {
    this.dateModleInput = model;
  }
  get dateInput(): any {
    return this.dateModleInput;
  }

  ngOnInit() {
    this.GetModelInfo();
    this.GetDomainList();
    this.CoreSiteCategoryGetAll();
    this.onCaptchaOrder();
  }
  GetDomainList() {
    this.coreSiteService.ServiceDomains(0).subscribe(
      (next) => {
        if (next.IsSuccess) {
          this.dataModelDomains = next.ListItems;
        }
      },
      (error) => {
        this.toastrService.toastr.error(
          this.publicHelper.CheckError(error),
          "خطا در دریافت لیست دامنه های قابل استفاده"
        );
      }
    );
  }
  GetModelInfo() {
    this.coreSiteService.ServiceViewModel().subscribe(
      (next) => {
        if (next.IsSuccess) {
          this.dataModel = next;
        }
      },
      (error) => {
        this.toastrService.toastr.error(
          this.publicHelper.CheckError(error),
          "خطا در دریافت مدل"
        );
      }
    );
  }

  CoreSiteCategoryGetAll() {
    this.subManager.add(
      this.coreSiteCategoryService.ServiceGetAll(this.filteModel).subscribe(
        (next) => {
          if (next.IsSuccess) {
            this.dataModelCategory = next;
            this.dataModelLoad = true;
            this.toastrService.toastr.info("اطلاعات دریافت شد", "توجه");
          }
        },
        (error) => {
          this.toastrService.toastr.error(
            this.publicHelper.CheckError(error),
            "خطا در دریافت اطلاعات وب سایتها"
          );
        }
      )
    );
  }
  clickSelectSiteCategory(Id: number) {
    let filterModel: FilterModel = new FilterModel();
    filterModel.RowPerPage = 50;

    this.dataModelModule = new ErrorExcptionResult<any>();
    this.subManager.add(
      this.coreModuleService
        .ServiceGetAllByCategorySiteId(Id, filterModel)
        .subscribe(
          (next2) => {
            if (next2.IsSuccess) {
              this.dataModelModule = next2;
              this.dataModelLoad = true;
              this.toastrService.toastr.info("اطلاعات دریافت شد", "توجه");
            }
          },
          (error2) => {
            this.toastrService.toastr.error(
              this.publicHelper.CheckError(error2),
              "خطا در دریافت اطلاعات وب سایتها"
            );
          }
        )
    );
  }
  onSubmit() {
    let AddFirstSite = false;
    if (this.dateModleInput && this.dateModleInput.AddFirstSite)
      AddFirstSite = true;
      this.dataModel.Item.captchaKey= this.captchaModel.Key;

    if (AddFirstSite) {
      this.subManager.add(
        this.coreSiteService.ServiceAddFirstSite(this.dataModel.Item).subscribe(
          (next) => {
            this.dateModleInput. onActionAddFirstSite(next) ;
          },
          (error) => {
            this.toastrService.toastr.error(
              this.publicHelper.CheckError(error),
              "خطا در ساخت وب سایت"
            );
          }
        )
      );
    } else {
      this.subManager.add(
        this.coreSiteService.ServiceAdd(this.dataModel.Item).subscribe(
          (next) => {
            if (next.IsSuccess) {
            }
          },
          (error) => {
            this.toastrService.toastr.error(
              this.publicHelper.CheckError(error),
              "خطا در ساخت وب سایت"
            );
          }
        )
      );
    }
  }
  onCaptchaOrder() {
    this.subManager.add(
      this.cmsAuthService.ServiceCaptcha().subscribe(
        (next) => {
          this.captchaModel =  next.Item;
        },
        (error) => {
          this.toastrService.toastr.error(
            this.publicHelper.CheckError(error),
            "خطا در دریافت عکس کپچا"
          );
        }
      )
    );
  }
}
