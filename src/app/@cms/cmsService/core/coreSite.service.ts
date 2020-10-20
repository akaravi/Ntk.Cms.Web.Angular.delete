import { Injectable, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { AuthRenewTokenModel } from 'app/@cms/cmsModels/core/authModel';
import { map, catchError, retry } from "rxjs/operators";
import { ErrorExcptionResult } from 'app/@cms/cmsModels/base/errorExcptionResult';
import { ApiCmsServerBase } from '../_base/apiCmsServerBase.service';
import { FilterModel } from 'app/@cms/cmsModels/base/filterModel';
import { CoreSiteSearchModel } from 'app/@cms/cmsModels/core/coreSiteModel';
import { CoreSiteAddFirstSiteDtoModel } from 'app/@cms/cmsModels/core/coreSiteAddFirstSiteDtoModel';


@Injectable({
  providedIn: 'root',
})
export class CoreSiteService extends ApiCmsServerBase<any,number> implements OnDestroy {
  subManager = new Subscription();

  getModuleCotrolerUrl()
  {
     return 'CoreSite';
  }

  ngOnDestroy() {
    this.subManager.unsubscribe();
  }
 
  ServiceSelectSite(model: AuthRenewTokenModel) {
    return this.cmsAuthService.ServiceRenewToken(model);
  }

  ServiceWebScreenshot<TOut>(model: any) {
 
    return this.http
      .post(this.baseUrl + this.getModuleCotrolerUrl() + "/WebScreenshot" ,model, { headers: this.getHeaders() })
      .pipe(
        map((ret: ErrorExcptionResult<TOut>) => {
          return this.errorExcptionResultCheck(ret);
        },catchError(this.handleError))
      );
  }
  ServiceAddFirstSite<TOut>(model: CoreSiteAddFirstSiteDtoModel) {
 
    return this.http
      .post(this.baseUrl + this.getModuleCotrolerUrl() + "/AddFirstSite" ,model, { headers: this.getHeaders() })
      .pipe(
        map((ret: ErrorExcptionResult<TOut>) => {
          return this.errorExcptionResultCheck(ret);
        },catchError(this.handleError))
      );
  }
  ServiceGetAllWithAlias<TOut>(model: FilterModel) {
    if (model == null) model = new FilterModel();
 
    return this.http
      .post(this.baseUrl + this.getModuleCotrolerUrl() + "/GetAllWithAlias", model, {
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
  ServiceGetAllChildWithAlias<TOut>(model: FilterModel) {
    if (model == null) model = new FilterModel();
 
    return this.http
      .post(this.baseUrl + this.getModuleCotrolerUrl() + "/GetAllChildWithAlias", model, {
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
  ServiceSearchNew<TOut>(model: FilterModel) {
    if (model == null) model = new FilterModel();
 
    return this.http
      .post(this.baseUrl + this.getModuleCotrolerUrl() + "/SearchNew", model, {
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
  ServiceSearch<TOut>(model: CoreSiteSearchModel) {
 
    return this.http
      .post(this.baseUrl + this.getModuleCotrolerUrl() + "/Search", model, {
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
  ServiceDomain<TOut>() {
 
    return this.http
      .get(this.baseUrl + this.getModuleCotrolerUrl() + "/Domain",  {
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
  ServiceDomains<TOut>(id: number) {
 
    return this.http
      .get(this.baseUrl + this.getModuleCotrolerUrl() + "/Domains/" + id, { headers: this.getHeaders() })
      .pipe(
        map((ret: ErrorExcptionResult<TOut>) => {
          return this.errorExcptionResultCheck(ret);
        },catchError(this.handleError))
      );
  }
}
