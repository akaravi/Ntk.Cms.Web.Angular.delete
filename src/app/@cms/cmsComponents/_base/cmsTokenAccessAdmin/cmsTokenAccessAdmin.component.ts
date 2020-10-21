import { Component, OnInit } from "@angular/core";
import { TokenInfoModel } from "app/@cms/cmsModels/base/tokenInfoModel";
import { AuthRenewTokenModel } from "app/@cms/cmsModels/core/authModel";
import { CmsAuthService } from "app/@cms/cmsService/core/auth.service";
import { CmsToastrServiceService } from "app/@cms/cmsService/_base/cmsToastrService.service";

@Component({
  selector: "app-cms-token-access-admin",
  templateUrl: "./cmsTokenAccessAdmin.component.html",
  styleUrls: ["./cmsTokenAccessAdmin.component.scss"],
})
export class CmsTokenAccessAdminComponent implements OnInit {
  constructor(
    public cmsAuthService: CmsAuthService,
    private toastrService: CmsToastrServiceService
  ) {
    this.cmsAuthService.CorrectTokenInfoBSObs.subscribe((vlaue) => {
      this.TokenInfo = vlaue;
    });
  }
  TokenInfo: TokenInfoModel = new TokenInfoModel();
  loadingStatus = false;
  ngOnInit() {}
  onActionbuttonUserAccessAdminAllowToAllData() {
    let AuthModel: AuthRenewTokenModel = new AuthRenewTokenModel();
    let NewToall = !this.TokenInfo.UserAccessAdminAllowToAllData;
    AuthModel.UserAccessAdminAllowToProfessionalData = this.TokenInfo.UserAccessAdminAllowToProfessionalData;
    AuthModel.UserAccessAdminAllowToAllData = NewToall;
    AuthModel.SiteId = this.TokenInfo.SiteId;
    AuthModel.UserId = this.TokenInfo.UserId;
    AuthModel.lang = this.TokenInfo.Language;

    var title = "اطلاعات ";
    var message = "";
    if (AuthModel.UserAccessAdminAllowToAllData)
      message = "درخواست برای دسترسی به کلیه اطلاعات به سرور ارسال شد";
    else message = "درخواست قطع  دسترسی به کل اطلاعات  به سرور ارسال شد";
    this.toastrService.toastr.info(message, title);
    this.loadingStatus = true;
    this.cmsAuthService.ServiceRenewToken(AuthModel).subscribe(
      (next) => {
        this.loadingStatus = false;
        if (next.IsSuccess) {
          var title = "اطلاعات ";
          if (next.Item.UserAccessAdminAllowToAllData == NewToall) {
            var message = "دسترسی تایید شد";
            this.toastrService.toastr.success(message, title);
          } else {
            var message = "دسترسی  جدید تایید نشد";
            this.toastrService.toastr.warning(message, title);
          }
        } else {
          var title = "برروز خطا ";
          var message = next.ErrorMessage;
          this.toastrService.toastr.error(message, title);
        }
      },
      () => {}
    );
  }
  onActionbuttonUserAccessAdminAllowToProfessionalData() {
    let AuthModel: AuthRenewTokenModel = new AuthRenewTokenModel();
    let NewToPerf = !this.TokenInfo.UserAccessAdminAllowToProfessionalData;
    AuthModel.UserAccessAdminAllowToProfessionalData = NewToPerf;
    AuthModel.UserAccessAdminAllowToAllData = this.TokenInfo.UserAccessAdminAllowToAllData;
    AuthModel.SiteId = this.TokenInfo.SiteId;
    AuthModel.UserId = this.TokenInfo.UserId;
    AuthModel.lang = this.TokenInfo.Language;

    var title = "اطلاعات ";
    var message = "";
    if (AuthModel.UserAccessAdminAllowToAllData)
      message = "درخواست برای دسترسی حرفه ایی به سرور ارسال شد";
    else message = "درخواست قطع  دسترسی حرفه ایی  به سرور ارسال شد";
    this.toastrService.toastr.info(message, title);
    this.loadingStatus = true;
    this.cmsAuthService.ServiceRenewToken(AuthModel).subscribe(
      (next) => {
        this.loadingStatus = false;
        if (next.IsSuccess) {
          var title = "اطلاعات ";
          if (next.Item.UserAccessAdminAllowToProfessionalData == NewToPerf) {
            var message = "دسترسی تایید شد";
            this.toastrService.toastr.success(message, title);
          } else {
            var message = "دسترسی  جدید تایید نشد";
            this.toastrService.toastr.warning(message, title);
          }
        } else {
          var title = "برروز خطا ";
          var message = next.ErrorMessage;
          this.toastrService.toastr.error(message, title);
        }
      },
      () => {}
    );
  }
  onActionbuttonSelectUser() {
    if (this.UserId == this.TokenInfo.UserId) {
      var title = "هشدار";
      var message =
        "شناسه درخواستی این کاربر با کاربری که در آن هستید یکسان است";
      this.toastrService.toastr.warning(message, title);
      return;
    }
    let AuthModel: AuthRenewTokenModel = new AuthRenewTokenModel();
    AuthModel.UserAccessAdminAllowToProfessionalData = this.TokenInfo.UserAccessAdminAllowToProfessionalData;
    AuthModel.UserAccessAdminAllowToAllData = this.TokenInfo.UserAccessAdminAllowToAllData;
    AuthModel.SiteId = this.TokenInfo.SiteId;
    AuthModel.UserId = this.UserId;
    AuthModel.lang = this.TokenInfo.Language;

    var title = "اطلاعات ";
    var message = "درخواست تغییر کاربر به سرور ارسال شد";
    this.toastrService.toastr.info(message, title);
    this.loadingStatus = true;
    this.cmsAuthService.ServiceRenewToken(AuthModel).subscribe(
      (next) => {
        this.loadingStatus = false;
        if (next.IsSuccess) {
          if (next.Item.UserId == this.UserId) {
            var message = "دسترسی به کاربر جدید تایید شد";
            this.toastrService.toastr.success(message, title);
          } else {
            var message = "دسترسی به کاربر جدید تایید نشد";
            this.toastrService.toastr.warning(message, title);
          }
        } else {
          var title = "برروز خطا ";
          var message = next.ErrorMessage;
          this.toastrService.toastr.error(message, title);
        }
      },
      () => {}
    );
  }
  SiteId: number;
  UserId: number;
  onActionbuttonSelectSite() {
    if (this.SiteId == this.TokenInfo.SiteId) {
      var title = "هشدار";
      var message = "شناسه این وب سایت با وب سایتی که در آن هستید یکسان است";
      this.toastrService.toastr.warning(message, title);
      return;
    }
    let AuthModel: AuthRenewTokenModel = new AuthRenewTokenModel();
    AuthModel.UserAccessAdminAllowToProfessionalData = this.TokenInfo.UserAccessAdminAllowToProfessionalData;
    AuthModel.UserAccessAdminAllowToAllData = this.TokenInfo.UserAccessAdminAllowToAllData;
    AuthModel.UserId = this.TokenInfo.UserId;
    AuthModel.SiteId = this.SiteId;
    AuthModel.lang = this.TokenInfo.Language;

    var title = "اطلاعات ";
    var message = "درخواست تغییر سایت به سرور ارسال شد";
    this.toastrService.toastr.info(message, title);
    this.loadingStatus = true;
    this.cmsAuthService.ServiceRenewToken(AuthModel).subscribe(
      (next) => {
        this.loadingStatus = false;
        if (next.IsSuccess) {
          
          var title = "اطلاعات ";
          if (next.Item.SiteId == this.SiteId) {
            var message = "دسترسی به سایت جدید تایید شد";
            this.toastrService.toastr.success(message, title);
          } else {
            var message = "دسترسی به سایت جدید تایید نشد";
            this.toastrService.toastr.warning(message, title);
          }
        } else {
          var title = "برروز خطا ";
          var message = next.ErrorMessage;
          this.toastrService.toastr.error(message, title);
          
        }
      },
      () => {}
    );
  }
}
