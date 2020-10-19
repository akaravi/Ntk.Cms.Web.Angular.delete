import { Injectable, OnDestroy } from '@angular/core';
import { ErrorExcptionResult } from 'app/@cms/cmsModels/base/errorExcptionResult';
import { Subscription } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { ApiServerBase } from '../_base/apiServerBase.service';


@Injectable()
export class SmsMainApiPathCompanyService extends ApiServerBase<number> implements OnDestroy {

    subManager = new Subscription();

    getModuleCotrolerUrl()
    {
       return 'SmsMainApiPathCompany';
    }
  
    ngOnDestroy() {
      this.subManager.unsubscribe();
    }
   
}
