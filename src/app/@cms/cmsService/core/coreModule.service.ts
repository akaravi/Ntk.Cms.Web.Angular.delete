import { Injectable, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { map, catchError, retry } from "rxjs/operators";
import { ErrorExcptionResult } from 'app/@cms/cmsModels/base/errorExcptionResult';
import { ApiCmsServerBase } from '../_base/apiCmsServerBase.service';
import { FilterModel } from 'app/@cms/cmsModels/base/filterModel';


export class CoreModuleService extends ApiCmsServerBase<any,number> implements OnDestroy {
  subManager = new Subscription();

  getModuleCotrolerUrl()
  {
    return 'CoreModule';
  }

  ngOnDestroy() {
    this.subManager.unsubscribe();
  }
  ServiceAutoAdd<TOut>() {
    
 
    return this.http
      .post(this.baseUrl + this.getModuleCotrolerUrl() + "/AutoAdd/", {
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
  ServiceConfig<TOut>(MoudleClassName:string) {
    
 
    return this.http
      .post(this.baseUrl + this.getModuleCotrolerUrl() + "/Config/",MoudleClassName, {
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
  ServiceGetOneWithModuleConfig<TOut>(model: FilterModel) {
    if (model == null) model = new FilterModel();
 
    return this.http
      .post(this.baseUrl + this.getModuleCotrolerUrl() + "/GetOneWithModuleConfig/", model, {
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
  ServiceGetViewModelWithModuleConfig<TOut>(id:number) {
 
    return this.http
      .get(this.baseUrl + this.getModuleCotrolerUrl() + "/GetViewModelWithModuleConfig/"+id, {
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
  ServiceGetAllModuleName<TOut>(model: FilterModel) {
    if (model == null) model = new FilterModel();
 
    return this.http
      .post(this.baseUrl + this.getModuleCotrolerUrl() + "/GetAllModuleName/", model, {
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
  ServiceGetAllByCategorySiteId<TOut>(CategorySiteId: number ,model: FilterModel) {
    if (model == null) model = new FilterModel();
 
    return this.http
      .post(this.baseUrl + this.getModuleCotrolerUrl() + "/GetAllByCategorySiteId/"+CategorySiteId, model, {
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
