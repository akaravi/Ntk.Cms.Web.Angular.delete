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
import { ToastrService } from 'ngx-toastr';
import { PublicHelper } from 'app/@cms/cmsCommon/helper/publicHelper';
import { environment } from 'environments/environment';
import { CoreAuthService } from 'ntk-cms-api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, AfterViewInit, OnDestroy {
  currentLang = 'fa';
  toggleClass = 'ft-maximize';
  placement = 'bottom-right';
  public isCollapsed = true;
  layoutSub: Subscription;
  @Output()
  toggleHideSidebar = new EventEmitter<Object>();

  public config: any = {};

  constructor(
    public translate: TranslateService,
    private layoutService: LayoutService,
    private configService: ConfigService,
    private router: Router,
    private route: ActivatedRoute,
    private coreAuthService: CoreAuthService,
    private toastrService: ToastrService,
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
  }

  ngOnInit() {
    this.config = this.configService.templateConf;
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
    this.coreAuthService.ServiceLogout().subscribe(
      (next) => {
        if (next.IsSuccess) {
          this.router.navigate([environment.cmsUiConfig.Pathlogin]);
        }
      },
      (error) => {
        this.toastrService.error(
          this.publicHelper.CheckError(error),
          'خطا در خروج از سیستم'
        );
      }
    );
  }
}
