import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { ToastrModule } from 'ngx-toastr';
import { AgmCoreModule } from '@agm/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { StoreModule } from '@ngrx/store';

import {
  PerfectScrollbarModule,
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface,
} from 'ngx-perfect-scrollbar';

import { AppComponent } from './app.component';
import { DragulaService } from 'ng2-dragula';
import { AuthService } from './@theme/shared/auth/auth.service';
import { AuthGuard } from './@theme/shared/auth/auth-guard.service';
import { CmsComponent } from './@cms/cms.component';
import { ThemeComponent } from './@theme/theme.component';
import { MainSharedModule } from './shared/mainShared.module';
import { CmsAuthGuard } from './@cms/cmsService/base/auth.guard.service';
import { CmsToastrService } from './@cms/cmsService/base/cmsToastr.service';
import { CoreAuthService } from 'ntk-cms-api';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelPropagation: false,
};

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent, CmsComponent, ThemeComponent],
  imports: [
    BrowserAnimationsModule,
    StoreModule.forRoot({}),
    AppRoutingModule,
    MainSharedModule,

    HttpClientModule,

    ToastrModule.forRoot({
      timeOut: 2000,
      enableHtml: true,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      closeButton: true,
    }),
    NgbModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    AgmCoreModule.forRoot({
      apiKey: 'YOUR KEY',
    }),
    PerfectScrollbarModule,
  ],
  providers: [
    AuthService,
    AuthGuard,
    CoreAuthService,
    CmsAuthGuard,

    DragulaService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
    // {
    //   provide: ErrorHandler,
    //   useClass: AppErrorHandler
    // }
    CmsToastrService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
