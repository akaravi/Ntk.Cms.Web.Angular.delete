import { Injectable, OnDestroy } from '@angular/core';
import { ErrorExcptionResult } from 'app/@cms/cmsModels/base/errorExcptionResult';
import { Subscription } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { ApiServerBase } from '../_base/apiServerBase.service';


@Injectable()
export class SmsMainApiPathCompanyService extends ApiServerBase implements OnDestroy {

    subManager = new Subscription();

    getModuleCotrolerUrl()
    {
       return 'SmsMainApiPath';
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
            return this.errorExcptionResultCheck<TOut>(ret);
          })
        );
    } 
}
