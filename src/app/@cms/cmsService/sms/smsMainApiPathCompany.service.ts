import { Injectable, OnDestroy } from '@angular/core';
import { ErrorExcptionResult } from 'app/@cms/cmsModels/base/errorExcptionResult';
import { Subscription } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { ApiCmsServerBase } from '../_base/apiCmsServerBase.service';


export class SmsMainApiPathCompanyService extends ApiCmsServerBase<any,number> implements OnDestroy {

    subManager = new Subscription();

    getModuleCotrolerUrl()
    {
       return 'SmsMainApiPathCompany';
    }
  
    ngOnDestroy() {
      this.subManager.unsubscribe();
    }
   
}
