import { Component, OnInit } from "@angular/core";
import { TokenInfoModel } from "app/@cms/cmsModels/base/tokenInfoModel";
import { AuthRenewTokenModel } from "app/@cms/cmsModels/core/authModel";
import { CmsAuthService } from "app/@cms/cmsService/core/auth.service";
import { CmsToastrServiceService } from 'app/@cms/cmsService/_base/cmsToastrService.service';
import { ToastrService } from "ngx-toastr";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: "app-cms-token-access-admin",
  templateUrl: "./cmsTokenAccessAdmin.component.html",
  styleUrls: ["./cmsTokenAccessAdmin.component.scss"],
})
export class CmsTokenAccessAdminComponent implements OnInit {
  constructor(
    private cmsAuthService: CmsAuthService,
    private toastrService: CmsToastrServiceService
  ) {
    this.cmsAuthService.CorrectTokenInfoObs.subscribe((vlaue) => {
      //console.log("TokenInfo:",vlaue);
      this.TokenInfo = vlaue;
    });
  }
  TokenInfo: TokenInfoModel = new TokenInfoModel();
  
  

  ngOnInit() {

  }
  onActionbuttonUserAccessAdminAllowToAllData() {
    let AuthModel: AuthRenewTokenModel = new AuthRenewTokenModel();

    AuthModel.UserAccessAdminAllowToProfessionalData = this.TokenInfo.UserAccessAdminAllowToProfessionalData;
    AuthModel.UserAccessAdminAllowToAllData = !this.TokenInfo.UserAccessAdminAllowToAllData;
    AuthModel.SiteId=this.TokenInfo.SiteId;
    AuthModel.lang=this.TokenInfo.Language;
      

    var title = "اطلاعات ";
    var message = "درخواست برای دسترسی جدید به سرور ارسال شد";
    this.toastrService.toastr.info(message, title);

    this.cmsAuthService.ServiceRenewToken(AuthModel).subscribe(
      (next) => {
        if (next.IsSuccess) {
          this.cmsAuthService.CorrectTokenInfo.next(next.Item);
          var title = "اطلاعات ";
          var message = "دسترسی تایید شد";
          this.toastrService.toastr.success(message, title);
        } else {
          var title = "برروز خطا ";
          var message = next.ErrorMessage;
          this.toastrService.toastr.error(message, title);
        }
      },
      (error) => {}
    );
  }
  onActionbuttonUserAccessAdminAllowToProfessionalData() {
    let AuthModel: AuthRenewTokenModel = new AuthRenewTokenModel();
    AuthModel.UserAccessAdminAllowToProfessionalData = !this.TokenInfo.UserAccessAdminAllowToProfessionalData;
    AuthModel.UserAccessAdminAllowToAllData = this.TokenInfo.UserAccessAdminAllowToAllData;
    AuthModel.SiteId=this.TokenInfo.SiteId;
    AuthModel.lang=this.TokenInfo.Language;

    var title = "اطلاعات ";
    var message = "درخواست برای دسترسی جدید به سرور ارسال شد";
    this.toastrService.toastr.info(message, title);

    this.cmsAuthService.ServiceRenewToken(AuthModel).subscribe(
      (next) => {
        if (next.IsSuccess) {
          var title = "اطلاعات ";
          var message = "دسترسی تایید شد";
          this.toastrService.toastr.success(message, title);
        } else {
          var title = "برروز خطا ";
          var message = next.ErrorMessage;
          this.toastrService.toastr.error(message, title);
        }
      },
      (error) => {}
    );
  }
}
