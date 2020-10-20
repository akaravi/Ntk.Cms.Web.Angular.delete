import { Injectable, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { ApiServerBase } from '../_base/apiServerBase.service';
import { retry, catchError, map } from 'rxjs/operators';
import { ErrorExcptionResult } from 'app/@cms/cmsModels/base/errorExcptionResult';

@Injectable({
  providedIn: 'root',
})
export class NewsCategoryService extends ApiServerBase<any,number> implements OnDestroy {
  subManager = new Subscription();

  getModuleCotrolerUrl()
  {
     return 'NewsCategory';
  }

  ngOnDestroy() {
    this.subManager.unsubscribe();
  }
  ServiceMove<TOut>(OldId: any, NewId: any) {
    return this.http
      .post(this.baseUrl + this.getModuleCotrolerUrl() + "/Move", {Old:OldId,New:NewId}, {
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
