import { Injectable, OnDestroy } from "@angular/core";
import { debounceTime, delay, map, tap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import * as fromStore from "../../cmsStore";
import { BehaviorSubject, Subscription, throwError } from "rxjs";
import { ErrorExcptionResult } from "app/@cms/cmsModels/base/errorExcptionResult";
import { FilterModel } from "app/@cms/cmsModels/base/filterModel";
import { PublicHelper } from "app/@cms/cmsCommon/helper/publicHelper";
import { CmsAuthService } from "app/@cms/cmsService/core/auth.service";
import { retry, catchError } from "rxjs/operators";
import { environment } from "environments/environment";
import { ApiServerBase } from "./apiServerBase.service";

@Injectable({
  providedIn: "root",
})
export class ApiCmsServerBase<TOut, TKey>
  extends ApiServerBase
  implements OnDestroy {
  //subManager = new Subscription();
  // public baseUrl = environment.cmsServerConfig.configApiServerPath;
  // public configApiRetry = environment.cmsServerConfig.configApiRetry;
  // constructor(
  //   public http: HttpClient,
  //   public toastrService: ToastrService,
  //   public router: Router,
  //   public store: Store<fromStore.State>,
  //   public cmsAuthService: CmsAuthService,
  //   public publicHelper: PublicHelper
  // ) {
  //   this.childConstructor();
  // }
  //private _loading$ = new BehaviorSubject<boolean>(false);
  // get loading$() {
  //   if (this._loading$ == null) return false;
  //   return this._loading$.asObservable();
  // }
  // ngOnDestroy() {
  //   this.subManager.unsubscribe();
  // }
  // childConstructor() {}
  // getModuleCotrolerUrl() {
  //   return "Empty";
  // }
  // getHeaders() {
  //   const token = this.publicHelper.CheckToken();
  //   const headers = { Authorization: token };
  //   return headers;
  // }

  // errorExcptionResultCheck(model: ErrorExcptionResult<TOut>) {
  //   if (model) {
  //     if (model.IsSuccess) {
  //     } else {
  //       let title="خطا در دریافت اطلاعات از سرور";
  //       let message=model.ErrorMessage
  //       this.toastrService.error(message, title);
  //     }
  //   }
  //   this._loading$.next(false);

  //   return model;
  // }
  // handleError(error) {
  //   this._loading$.next(false);
  //   if (!error) return;
  //   let errorMessage = error.message;
  //   if (error.status) {
  //     if (error.status == 401) {
  //       //window.location.href = environment.cmsUiConfig.Pathlogin;
  //       this.router.navigate([environment.cmsUiConfig.Pathlogin]);
  //     }
  //     // server-side error
  //     errorMessage = `Cms Error Code: ${error.status}\nMessage: ${error.message}`;

  //     if (error.status == 401 || error.status == "401") {
  //       let title="خطای امنیتی";
  //       let message="لطفا مجدد وارد سیستم شود";
  //       this.toastrService.error(message, title);
  //       this.router.navigate([environment.cmsUiConfig.Pathlogin]);
  //     }
  //   } else if (error.error instanceof ErrorEvent) {
  //     // client-side error
  //     errorMessage = `Cms Error: ${error.error.message}`;
  //   }

  //   //window.alert(errorMessage);
  //   return throwError(errorMessage);
  // }

  ServiceViewModel() {
    this._loading$.next(true);
    return this.http
      .get(this.baseUrl + this.getModuleCotrolerUrl() + "/ViewModel", {
        headers: this.getHeaders(),
      })
      .pipe(
        catchError(this.handleError),
        map((ret: ErrorExcptionResult<TOut>) => {
          return this.errorExcptionResultCheck(ret);
        })
      );
  }

  ServiceGetAll(model: FilterModel) {
    this._loading$.next(true);
    if (model == null) model = new FilterModel();

    return this.http
      .post(this.baseUrl + this.getModuleCotrolerUrl() + "/getAll", model, {
        headers: this.getHeaders(),
      })
      .pipe(
        // tap(_ => console.log("tap:1")),
        // debounceTime(200),
        // //switchMap(() => this._search()),
        // delay(200),

        retry(this.configApiRetry),
        catchError(this.handleError),
        map((ret: ErrorExcptionResult<TOut>) => {
          return this.errorExcptionResultCheck(ret);
        })
      );
  }

  ServiceGetOneById(id: TKey) {
    this._loading$.next(true);
    return this.http
      .get(this.baseUrl + this.getModuleCotrolerUrl() + "/" + id, {
        headers: this.getHeaders(),
      })
      .pipe(
        retry(this.configApiRetry),
        catchError(this.handleError),
        map((ret: ErrorExcptionResult<TOut>) => {
          return this.errorExcptionResultCheck(ret);
        })
      );
  }

  ServiceGetCount(model: FilterModel) {
    this._loading$.next(true);
    if (model == null) model = new FilterModel();

    return this.http
      .post(this.baseUrl + this.getModuleCotrolerUrl() + "/Count", model, {
        headers: this.getHeaders(),
      })
      .pipe(
        retry(this.configApiRetry),
        catchError(this.handleError),
        map((ret: ErrorExcptionResult<TOut>) => {
          return this.errorExcptionResultCheck(ret);
        })
      );
  }
  ServiceExportFile(model: FilterModel) {
    this._loading$.next(true);
    if (model == null) model = new FilterModel();

    return this.http
      .post(this.baseUrl + this.getModuleCotrolerUrl() + "/ExportFile", model, {
        headers: this.getHeaders(),
      })
      .pipe(
        retry(this.configApiRetry),
        catchError(this.handleError),
        map((ret: ErrorExcptionResult<TOut>) => {
          return this.errorExcptionResultCheck(ret);
        })
      );
  }
  ServiceAdd(model: any) {
    this._loading$.next(true);
    return this.http
      .post(this.baseUrl + this.getModuleCotrolerUrl() + "/", model, {
        headers: this.getHeaders(),
      })
      .pipe(
        retry(this.configApiRetry),
        catchError(this.handleError),
        map((ret: ErrorExcptionResult<TOut>) => {
          return this.errorExcptionResultCheck(ret);
        })
      );
  }

  ServiceEdit(model: any) {
    this._loading$.next(true);
    return this.http
      .put(this.baseUrl + this.getModuleCotrolerUrl() + "/", model, {
        headers: this.getHeaders(),
      })
      .pipe(
        retry(this.configApiRetry),
        catchError(this.handleError),
        map((ret: ErrorExcptionResult<TOut>) => {
          return this.errorExcptionResultCheck(ret);
        })
      );
  }

  ServiceDelete(id: any) {
    this._loading$.next(true);
    return this.http
      .delete(this.baseUrl + this.getModuleCotrolerUrl() + "/" + id, {
        headers: this.getHeaders(),
      })
      .pipe(
        retry(this.configApiRetry),
        catchError(this.handleError),
        map((ret: ErrorExcptionResult<TOut>) => {
          return this.errorExcptionResultCheck(ret);
        })
      );
  }
  ServiceDeleteList(ids: Array<any>) {
    this._loading$.next(true);
    return this.http
      .post(this.baseUrl + this.getModuleCotrolerUrl() + "/DeleteList", ids, {
        headers: this.getHeaders(),
      })
      .pipe(
        retry(this.configApiRetry),
        catchError(this.handleError),
        map((ret: ErrorExcptionResult<TOut>) => {
          return this.errorExcptionResultCheck(ret);
        })
      );
  }
}
