import {
  Component,
  Output,
  EventEmitter,
  OnDestroy,
  OnInit,
  AfterViewInit,
} from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { LayoutService } from "../../../shared/services/layout.service";
import { Subscription } from "rxjs";
import { ConfigService } from "../../../shared/services/config.service";
import { Router, ActivatedRoute } from "@angular/router";
import { CmsAuthService } from "app/@cms/cmsService/core/auth.service";
import { PublicHelper } from "app/@cms/cmsCommon/helper/publicHelper";
import { environment } from "environments/environment";
import { TokenInfoModel } from "app/@cms/cmsModels/base/tokenInfoModel";
import { CmsToastrServiceService } from 'app/@cms/cmsService/_base/cmsToastrService.service';
import { AuthRenewTokenModel } from 'app/@cms/cmsModels/core/authModel';

@Component({
  selector: "app-cms-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class CmsNavbarComponent implements OnInit, AfterViewInit, OnDestroy {
  currentLang = "fa";
  toggleClass = "ft-maximize";
  placement = "bottom-right";
  public isCollapsed = true;
  layoutSub: Subscription;
  @Output()
  toggleHideSidebar = new EventEmitter<Object>();

  public config: any = {};
  TokenInfo: TokenInfoModel = new TokenInfoModel();
  constructor(
    public translate: TranslateService,
    private layoutService: LayoutService,
    private configService: ConfigService,
    private router: Router,
    public cmsAuthService: CmsAuthService,
    private toastrService: CmsToastrServiceService,
    private publicHelper: PublicHelper,
    
  ) {
    // const browserLang: string = translate.getBrowserLang();
    const browserLang: string = "fa";
    translate.use(browserLang.match(/fa|en|es|pt|de/) ? browserLang : "fa");

    this.layoutSub = layoutService.changeEmitted$.subscribe((direction) => {
      const dir = direction.direction;
      if (dir === "rtl") {
        this.placement = "bottom-left";
      } else if (dir === "ltr") {
        this.placement = "bottom-right";
      }
    });
    this.cmsAuthService.CorrectTokenInfoBSObs.subscribe((vlaue) => {
      //console.log("TokenInfo Navbar:",vlaue);
      this.TokenInfo = vlaue;
    });
  }
  loadingStatus=false;

  ngOnInit() {
    this.config = this.configService.templateConf;
    if (
      this.TokenInfo == null ||
      this.TokenInfo.UserId == null ||
      this.TokenInfo.UserId == 0
    ) {
      this.cmsAuthService.CorrectTokenInfoBSRenew();
    }
  }
  ngAfterViewInit() {
    if (this.config.layout.dir) {
      setTimeout(() => {
        const dir = this.config.layout.dir;
        if (dir === "rtl") {
          this.placement = "bottom-left";
        } else if (dir === "ltr") {
          this.placement = "bottom-right";
        }
      }, 0);
    }
  }

  ngOnDestroy() {
    if (this.layoutSub) {
      this.layoutSub.unsubscribe();
    }
  }

  ChangeLanguage(language: string) {
    this.translate.use(language);

   

    let AuthModel: AuthRenewTokenModel = new AuthRenewTokenModel();
    AuthModel.UserAccessAdminAllowToProfessionalData = this.TokenInfo.UserAccessAdminAllowToProfessionalData;
    AuthModel.UserAccessAdminAllowToAllData = this.TokenInfo.UserAccessAdminAllowToAllData;
    AuthModel.SiteId = this.TokenInfo.SiteId;
    AuthModel.UserId = this.TokenInfo.UserId;
    AuthModel.lang = language;

    var title = "اطلاعات ";
    var message = "درخواست تغییر زبان به سرور ارسال شد";
    this.toastrService.toastr.info(message, title);
    this.loadingStatus = true;
    this.cmsAuthService.ServiceRenewToken(AuthModel).subscribe(
      (next) => {
        this.loadingStatus = false;
        if (next.IsSuccess) {
          if (next.Item.Language == language) {
            var message = "دسترسی به ربان جدید تایید شد";
            this.toastrService.toastr.success(message, title);
          } else {
            var message = "دسترسی به زبان جدید تایید نشد";
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

  ToggleClass() {
    if (this.toggleClass === "ft-maximize") {
      this.toggleClass = "ft-minimize";
    } else {
      this.toggleClass = "ft-maximize";
    }
  }

  toggleNotificationSidebar() {
    this.layoutService.emitNotiSidebarChange(true);
  }

  toggleSidebar() {
    const appSidebar = document.getElementsByClassName("app-sidebar")[0];
    if (appSidebar.classList.contains("hide-sidebar")) {
      this.toggleHideSidebar.emit(false);
    } else {
      this.toggleHideSidebar.emit(true);
    }
  }
  ActionLogOut() {
    this.loadingStatus=true;

    this.cmsAuthService.ServiceLogout().subscribe(
      (next) => {
        if (next.IsSuccess) {
          
          this.router.navigate([environment.cmsUiConfig.Pathlogin]);
        }
        this.loadingStatus=false;

      },
      (error) => {
        this.toastrService.toastr.error(
          this.publicHelper.CheckError(error),
          "خطا در خروج از سیستم"
        );
        this.loadingStatus=false;

      }
    );
  }
}
