import { Injectable, OnDestroy } from '@angular/core';
import { ErrorExcptionResult } from 'app/@cms/cmsModels/base/errorExcptionResult';
import { Subscription } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { ApiServerBase } from '../_base/apiServerBase.service';

@Injectable()
export class SmsMainApiPathService extends ApiServerBase<any,number> implements OnDestroy {

    subManager = new Subscription();

    getModuleCotrolerUrl()
    {
       return 'SmsMainApiPath';
    }
  
    ngOnDestroy() {
      this.subManager.unsubscribe();
    }
  

}
