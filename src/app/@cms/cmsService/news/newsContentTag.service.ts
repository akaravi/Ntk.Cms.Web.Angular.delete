import { Injectable, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { ApiCmsServerBase } from '../_base/apiCmsServerBase.service';
import { ErrorExcptionResult } from 'app/@cms/cmsModels/base/errorExcptionResult';
import { catchError, map, retry } from 'rxjs/operators';
import { SearchTagModel } from 'app/@cms/cmsModels/base/searchModel';


export class NewsContentTagService extends ApiCmsServerBase<any, number> implements OnDestroy {
  subManager = new Subscription();

  getModuleCotrolerUrl() {
     return 'NewsContentTag';
  }

  ngOnDestroy() {
    this.subManager.unsubscribe();
  }

  ServiceSearchTag<TOut>(model: SearchTagModel) {

    return this.http
      .post(this.baseUrl + this.getModuleCotrolerUrl() + '/SearchTag/', model, {
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
