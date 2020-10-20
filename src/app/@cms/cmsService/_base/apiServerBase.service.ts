import { Inject, Injectable, Injector, OnDestroy } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import * as fromStore from "../../cmsStore";
import { BehaviorSubject, Subscription, throwError } from "rxjs";
import { ErrorExcptionResult } from "app/@cms/cmsModels/base/errorExcptionResult";

import { environment } from "environments/environment";

@Injectable({
  providedIn: "root",
})
export class ApiServerBase implements OnDestroy {
  subManager = new Subscription();
  public baseUrl = environment.cmsServerConfig.configApiServerPath;
  public configApiRetry = environment.cmsServerConfig.configApiRetry;
  constructor(
    @Inject(Injector) private injector: Injector,
    public http: HttpClient,

    //public toastrService: ToastrService,
    public router: Router,
    public store: Store<fromStore.State>
  ) {
    this.childConstructor();
  }
  public get toastrService(): ToastrService {
    return this.injector.get(ToastrService);
  }
  public _loading$ = new BehaviorSubject<boolean>(false);
  public loadingText="در حال بارگذاری...";
  get loading$() {
    if (this._loading$ == null) return false;
    return this._loading$.asObservable();
  }
  ngOnDestroy() {
    this.subManager.unsubscribe();
  }
  childConstructor() {}
  getModuleCotrolerUrl() {
    return "Empty";
  }
  getHeaders() {
    const token = this.CheckToken();
    const headers = { Authorization: token };
    return headers;
  }
  CheckToken() {
    const token = localStorage.getItem("token");

    if (!token || token === "null") {
      let title = "تایید توکن";
      let message = "لطفا مجددا وارد حساب کاربری خود شوید";
      if (this.toastrService) this.toastrService.warning(message, title);
      //this.router.navigate([environment.cmsUiConfig.Pathlogin]);
      window.location.href = environment.cmsUiConfig.Pathlogin;
    }
    return token;
  }
  errorExcptionResultCheck(model: ErrorExcptionResult<any>) {
    if (model) {
      if (model.IsSuccess) {
      } else {
        let title = "خطا در دریافت اطلاعات از سرور";
        let message = model.ErrorMessage;
        if (this.toastrService) this.toastrService.error(message, title);
      }
    }
    this._loading$.next(false);

    return model;
  }
  handleError(error) {
    //this._loading$.next(false);
    if (!error) return;
    let errorMessage = error.message;
    if (error.status) {
      if (error.status == 401) {
        window.location.href = environment.cmsUiConfig.Pathlogin;
        //this.router.navigate([environment.cmsUiConfig.Pathlogin]);
      }
      // server-side error
      errorMessage = `Cms Error Code: ${error.status}\nMessage: ${error.message}`;

      if (error.status == 401 || error.status == "401") {
        let title = "خطای امنیتی";
        let message = "لطفا مجدد وارد سیستم شود";
        if (this.toastrService)
          this.toastrService.error(message, title, {
            closeButton: true,
            timeOut: 5000,
            onActivateTick: true,
          });
        //this.router.navigate([environment.cmsUiConfig.Pathlogin]);
        window.location.href = environment.cmsUiConfig.Pathlogin;
      }
    } else if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Cms Error: ${error.error.message}`;
    }

    //window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
