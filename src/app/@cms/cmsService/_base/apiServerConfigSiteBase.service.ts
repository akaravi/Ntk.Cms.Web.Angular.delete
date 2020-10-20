import { Injectable, OnDestroy } from "@angular/core";
import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import * as fromStore from "../../cmsStore";
import { Subscription, throwError } from "rxjs";
import { ErrorExcptionResult } from "app/@cms/cmsModels/base/errorExcptionResult";
import { FilterModel } from "app/@cms/cmsModels/base/filterModel";
//import { PublicHelper } from "app/@cms/cmsCommon/helper/publicHelper";
import { CmsAuthService } from "app/@cms/cmsService/core/auth.service";
import { retry, catchError } from "rxjs/operators";
import { environment } from "environments/environment";
import { ApiServerBase } from './apiServerBase.service';

@Injectable({
  providedIn: "root",
})
export class ApiServerConfigSiteBase extends ApiServerBase implements OnDestroy {
  subManager = new Subscription();
  public baseUrl = environment.cmsServerConfig.configApiServerPath;
  public configApiRetry =environment. cmsServerConfig.configApiRetry;

  // constructor(
  //   public http: HttpClient,
  //   public alertService: ToastrService,
  //   public router: Router,
  //   public store: Store<fromStore.State>,
  //   public cmsAuthService: CmsAuthService,
  //   public publicHelper: PublicHelper
  // ) {}
  ngOnDestroy() {
    this.subManager.unsubscribe();
  }

  getModuleCotrolerUrl() {
    return "Empty";
  }
  // getHeaders() {
  //   const token = this.CheckToken();
  //   const headers = { Authorization: token };  
  //   return headers;
  // }
  // errorExcptionResultCheck<TOut>(model: ErrorExcptionResult<TOut>) {
  //   if (model) {
  //     if (model.IsSuccess) {

  //     } else {
  //       this.alertService.error(model.ErrorMessage, "خطا در دریافت از سرور");
  //     }
  //   }
  //   return model;
  // }

  // handleError(error) {
  //   let errorMessage = "";
  //   if (error.error instanceof ErrorEvent) {
  //     // client-side error
  //     errorMessage = `Error: ${error.error.message}`;
  //   } else {
  //     // server-side error
  //     errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  //   }
  //   window.alert(errorMessage);
  //   return throwError(errorMessage);
  // }

  ServiceSiteDefault<TOut>() {
    return this.http
    .get(this.baseUrl + this.getModuleCotrolerUrl()+ "/SiteDefault", {
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
  ServiceSiteDefaultSave<TOut>(model: any) {
 
    return this.http
      .post(this.baseUrl + this.getModuleCotrolerUrl(), model, {
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
  ServiceSiteStorage<TOut>(id: number) {
 
    return this.http
      .get(this.baseUrl + this.getModuleCotrolerUrl() + "/SiteStorage/" + id, {
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
  ServiceSiteStorageSave<TOut>(Siteid: number, model: any) {
 
    return this.http
      .post(
        this.baseUrl + this.getModuleCotrolerUrl() + "/SiteStorage/" + Siteid,
        model,
        {
          headers: this.getHeaders(),
        }
      )
      .pipe(
        retry(this.configApiRetry),
        catchError(this.handleError),
        map((ret: ErrorExcptionResult<TOut>) => {
          return this.errorExcptionResultCheck(ret);
        })
      );
  }

  ServiceSite<TOut>(id: number) {
 
    return this.http
      .get(this.baseUrl + this.getModuleCotrolerUrl() + "/Site/" + id, {
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
  ServiceSiteSave<TOut>(Siteid: number, model: any) {
 
    return this.http
      .post(this.baseUrl + this.getModuleCotrolerUrl() + "/Site/" + Siteid, model, {
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
  ServiceSiteAccess<TOut>(Siteid: number) {
 
    return this.http
      .get(this.baseUrl + this.getModuleCotrolerUrl() + "/SiteAccess/" + Siteid, {
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
  ServiceSiteAccessSave<TOut>(Siteid: number, model: any) {
 
    return this.http
      .post(
        this.baseUrl + this.getModuleCotrolerUrl() + "/SiteAccess/" + Siteid,
        model,
        {
          headers: this.getHeaders(),
        }
      )
      .pipe(
        retry(this.configApiRetry),
        catchError(this.handleError),
        map((ret: ErrorExcptionResult<TOut>) => {
          return this.errorExcptionResultCheck(ret);
        })
      );
  }
  ServiceSiteAccessDefault<TOut>(Siteid: number) {
 
    return this.http
      .get(
        this.baseUrl + this.getModuleCotrolerUrl() + "/SiteAccessDefault/" + Siteid,
        {
          headers: this.getHeaders(),
        }
      )
      .pipe(
        retry(this.configApiRetry),
        catchError(this.handleError),
        map((ret: ErrorExcptionResult<TOut>) => {
          return this.errorExcptionResultCheck(ret);
        })
      );
  }
  ServiceSiteAccessDefaultSave<TOut>(model: any) {
 
    return this.http
      .post(
        this.baseUrl + this.getModuleCotrolerUrl() + "/SiteAccessDefault/",
        model,
        {
          headers: this.getHeaders(),
        }
      )
      .pipe(
        retry(this.configApiRetry),
        catchError(this.handleError),
        map((ret: ErrorExcptionResult<TOut>) => {
          return this.errorExcptionResultCheck(ret);
        })
      );
  }
  ServiceAdminMain<TOut>() {
 
    return this.http
      .get(this.baseUrl + this.getModuleCotrolerUrl() + "/AdminMain/", {
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
  ServiceAdminMainSave<TOut>(model: any) {
 
    return this.http
      .post(this.baseUrl + this.getModuleCotrolerUrl() + "/AdminMain/", model, {
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
