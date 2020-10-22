import { Inject, Injectable, Injector, OnDestroy } from '@angular/core';
import { debounceTime, delay, map, tap } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromStore from '../../cmsStore';
import { BehaviorSubject, Subscription, throwError } from 'rxjs';
import { ErrorExcptionResult } from 'app/@cms/cmsModels/base/errorExcptionResult';

import { environment } from 'environments/environment';

// @Injectable({
//   providedIn: "root",
// })
export class ApiServerBase implements OnDestroy {
  subManager = new Subscription();
  public baseUrl = environment.cmsServerConfig.configApiServerPath;
  public configApiRetry = environment.cmsServerConfig.configApiRetry;
  // public cmsloadingBS = new BehaviorSubject<boolean>(false);
  // public cmsloadingObs = this.cmsloadingBS.asObservable();
  public loadingText = 'در حال بارگذاری...';
  // public loadingStatus: boolean = false;

  constructor(
    public http: HttpClient,
    public toastrService: ToastrService,
    public router: Router,
    public store: Store<fromStore.State>
  ) {
    this.childConstructor();

    // this.cmsloadingObs.subscribe((vlaue) => {
    //   this.loadingStatus = vlaue;
    // });

  }

  ngOnDestroy() {
    this.subManager.unsubscribe();
  }
  childConstructor() {}
  getModuleCotrolerUrl() {
    return 'Empty';
  }
  getHeaders() {
    const token = this.CheckToken();
    const headers = { Authorization: token };
    return headers;
  }
  CheckToken() {
    const token = localStorage.getItem('token');

    if (!token || token === 'null') {
      const title = 'تایید توکن';
      const message = 'لطفا مجددا وارد حساب کاربری خود شوید';

      if (this.toastrService) {
        this.toastrService.warning(message, title);
      } else {
        window.alert(message);
      }
      window.location.href = environment.cmsUiConfig.Pathlogin;
    }
    return token;
  }
  errorExcptionResultCheck(model: ErrorExcptionResult<any>) {
    if (model) {
      if (model.IsSuccess) {
      } else {
        const title = 'خطا در دریافت اطلاعات از سرور';
        const message = model.ErrorMessage;
        if (this.toastrService) { this.toastrService.error(message, title); }
      }
    }
    // this.loadingStatus=false;
    return model;
  }
  handleError(error) {
    if (!error) { return; }
    let errorMessage = error.message;
    if (error.status) {
      // server-side error
      errorMessage = `Cms Error Code: ${error.status}\nMessage: ${error.message}`;
      if (error.status === 401 || error.status === '401') {
        const title = 'خطای امنیتی';
        const message = 'لطفا مجدد وارد سیستم شود';
        if (this.toastrService) {
          this.toastrService.error(message, title, {
            closeButton: true,
            timeOut: 5000,
            onActivateTick: true,
          });
        } else {
          window.alert(message);
        }
        window.location.href = environment.cmsUiConfig.Pathlogin;
      }
    } else if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Cms Error: ${error.error.message}`;
    }
    if (this.toastrService) {
      const title = 'خطا';
      this.toastrService.error(errorMessage, title, {
        closeButton: true,
        timeOut: 5000,
        onActivateTick: true,
      });
    } else {
      window.alert(errorMessage);
    }
    return throwError(errorMessage);
  }
}
