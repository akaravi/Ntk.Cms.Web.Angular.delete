import {
  Component,
  Output,
  EventEmitter,
  OnDestroy,
  OnInit,
  AfterViewInit,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LayoutService } from '../../../shared/services/layout.service';
import { Subscription } from 'rxjs';
import { ConfigService } from '../../../shared/services/config.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PublicHelper } from 'app/@cms/cmsCommon/helper/publicHelper';
import { environment } from 'environments/environment';
import { CmsToastrServiceService } from 'app/@cms/cmsService/base/cmsToastrService.service';
import {
  AuthRenewTokenModel,
  CoreAuthService,
  TokenInfoModel,
} from 'ntk-cms-api';

@Component({
  selector: 'app-cms-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class CmsNavbarComponent implements OnInit, AfterViewInit, OnDestroy {
  currentLang = 'fa';
  toggleClass = 'ft-maximize';
  placement = 'bottom-right';
  public isCollapsed = true;
  layoutSub: Subscription;
  @Output()
  toggleHideSidebar = new EventEmitter<Object>();

  public config: any = {};
  TokenInfo: TokenInfoModel = new TokenInfoModel();
  loadingStatus = false;
  constructor(
    public translate: TranslateService,
    private layoutService: LayoutService,
    private configService: ConfigService,
    private router: Router,
    public cmsAuthService: CoreAuthService,
    private toastrService: CmsToastrServiceService,
    private publicHelper: PublicHelper
  ) {
    // const browserLang: string = translate.getBrowserLang();
    const browserLang = 'fa';
    translate.use(browserLang.match(/fa|en|es|pt|de/) ? browserLang : 'fa');

    this.layoutSub = layoutService.changeEmitted$.subscribe((direction) => {
      const dir = direction.direction;
      if (dir === 'rtl') {
        this.placement = 'bottom-left';
      } else if (dir === 'ltr') {
        this.placement = 'bottom-right';
      }
    });
    this.cmsAuthService.CorrectTokenInfoBSObs.subscribe((vlaue) => {
      // console.log("TokenInfo Navbar:",vlaue);
      this.TokenInfo = vlaue;
    });
  }

  ngOnInit() {
    this.config = this.configService.templateConf;
    if (
      this.TokenInfo == null ||
      this.TokenInfo.UserId == null ||
      this.TokenInfo.UserId === 0
    ) {
      this.cmsAuthService.CorrectTokenInfoBSRenew();
    }
  }
  ngAfterViewInit() {
    if (this.config.layout.dir) {
      setTimeout(() => {
        const dir = this.config.layout.dir;
        if (dir === 'rtl') {
          this.placement = 'bottom-left';
        } else if (dir === 'ltr') {
          this.placement = 'bottom-right';
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

    const AuthModel: AuthRenewTokenModel = new AuthRenewTokenModel();
    AuthModel.UserAccessAdminAllowToProfessionalData = this.TokenInfo.UserAccessAdminAllowToProfessionalData;
    AuthModel.UserAccessAdminAllowToAllData = this.TokenInfo.UserAccessAdminAllowToAllData;
    AuthModel.SiteId = this.TokenInfo.SiteId;
    AuthModel.UserId = this.TokenInfo.UserId;
    AuthModel.lang = language;

    let title = 'اطلاعات ';
    let message = 'درخواست تغییر زبان به سرور ارسال شد';
    this.toastrService.toastr.info(message, title);
    this.loadingStatus = true;
    this.cmsAuthService.ServiceRenewToken(AuthModel).subscribe(
      (next) => {
        this.loadingStatus = false;
        if (next.IsSuccess) {
          if (next.Item.Language === language) {
            message = 'دسترسی به ربان جدید تایید شد';
            this.toastrService.toastr.success(message, title);
          } else {
            message = 'دسترسی به زبان جدید تایید نشد';
            this.toastrService.toastr.warning(message, title);
          }
        } else {
          title = 'برروز خطا ';
          message = next.ErrorMessage;
          this.toastrService.toastr.error(message, title);
        }
      },
      () => { }
    );
  }

  ToggleClass() {
    if (this.toggleClass === 'ft-maximize') {
      this.toggleClass = 'ft-minimize';
    } else {
      this.toggleClass = 'ft-maximize';
    }
  }

  toggleNotificationSidebar() {
    this.layoutService.emitNotiSidebarChange(true);
  }

  toggleSidebar() {
    const appSidebar = document.getElementsByClassName('app-sidebar')[0];
    if (appSidebar.classList.contains('hide-sidebar')) {
      this.toggleHideSidebar.emit(false);
    } else {
      this.toggleHideSidebar.emit(true);
    }
  }
  ActionLogOut() {
    this.loadingStatus = true;

    this.cmsAuthService.ServiceLogout().subscribe(
      (next) => {
        if (next.IsSuccess) {
          this.router.navigate([environment.cmsUiConfig.Pathlogin]);
        }
        this.loadingStatus = false;
      },
      (error) => {
        this.toastrService.toastr.error(
          this.publicHelper.CheckError(error),
          'خطا در خروج از سیستم'
        );
        this.loadingStatus = false;
      }
    );
  }
}
