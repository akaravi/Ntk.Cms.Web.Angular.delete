import { Component, OnInit, OnDestroy } from "@angular/core";
import { CoreSiteService } from "../../../../cmsService/core/coreSite.service";
import { Subscription } from "rxjs";
import { FilterModel } from "app/@cms/cmsModels/base/filterModel";
import { ToastrService } from "ngx-toastr";
import { PublicHelper } from "app/@cms/cmsCommon/helper/publicHelper";
import { ErrorExcptionResult } from "app/@cms/cmsModels/base/errorExcptionResult";
import { AuthRenewTokenModel } from "app/@cms/cmsModels/core/authModel";
import { Router } from "@angular/router";
import { environment } from "environments/environment";
import { CoreCpMainMenuService } from "app/@cms/cmsService/core/coreCpMainMenu.service";
import { CmsAuthService } from 'app/@cms/cmsService/core/auth.service';
import { CmsToastrServiceService } from 'app/@cms/cmsService/_base/cmsToastrService.service';
@Component({
  selector: "app-cms-site-select",
  templateUrl: "./select.component.html",
  styleUrls: ["./select.component.scss"],
})
export class CoreSiteSelectComponent implements OnInit, OnDestroy {
  subManager = new Subscription();
  filteModel = new FilterModel();
  dataModel: ErrorExcptionResult<any>;
  constructor(
    private cmsAuthService: CmsAuthService,
    private coreSiteService: CoreSiteService,
    private toastrService: CmsToastrServiceService,
    private publicHelper: PublicHelper,
    private router: Router,
    private coreCpMainMenuService: CoreCpMainMenuService
  ) {}
  ngOnDestroy() {
    this.subManager.unsubscribe();
  }

  ngOnInit() {
    this.CoreSiteGetAll();
  }
  CoreSiteGetAll() {
    this.subManager.add(
      this.coreSiteService.ServiceGetAll(this.filteModel).subscribe(
        (next) => {
          if (next.IsSuccess) {
            this.dataModel = next;
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
  trackByFn() {}
  clickSelectSite(model: any) {
    let AuthModel: AuthRenewTokenModel;
    AuthModel = new AuthRenewTokenModel();
    AuthModel.SiteId = model["Id"];
    this.subManager.add(
      this.cmsAuthService.ServiceRenewToken(AuthModel).subscribe(
        (next) => {
          if (next.IsSuccess) {
            this.router.navigate([environment.cmsUiConfig.Pathdashboard]);
          }
        },
        (error) => {
          this.toastrService.toastr.error(
            this.publicHelper.CheckError(error),
            "خطا در ورود"
          );
        }
      )
    );
  }
  onActionAddFirstSite(model: ErrorExcptionResult<any>) {
    if (model.IsSuccess) {
      let AuthModel: AuthRenewTokenModel;
      AuthModel = new AuthRenewTokenModel();
      AuthModel.SiteId = model["Id"];
      this.subManager.add(
        this.cmsAuthService.ServiceRenewToken(AuthModel).subscribe(
          (next) => {
            if (next.IsSuccess) {
              this.router.navigate([environment.cmsUiConfig.Pathdashboard]);
            }
          },
          (error) => {
            this.toastrService.toastr.error(
              this.publicHelper.CheckError(error),
              "خطا در ورود"
            );
          }
        )
      );
    }
  }
}
