import { Injectable, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { ApiCmsServerBase } from '../_base/apiCmsServerBase.service';
import { FilterModel } from 'app/@cms/cmsModels/base/filterModel';
import { ErrorExcptionResult } from 'app/@cms/cmsModels/base/errorExcptionResult';
import { catchError, map, retry } from 'rxjs/operators';
import { BankPaymentTransactionMakerDtoModel } from 'app/@cms/cmsDtoModels/bankPayment/bankPaymentTransactionMakerDtoModel';


export class BankPaymentPrivateSiteConfigService extends ApiCmsServerBase<any,number> implements OnDestroy {

  getModuleCotrolerUrl()
  {
     return 'BankPaymentPrivateSiteConfig';
  }

  
  ServiceTestPay<TOut>(model: BankPaymentTransactionMakerDtoModel) {
    if (model == null) model = new BankPaymentTransactionMakerDtoModel();
 
    return this.http
      .post(this.baseUrl + this.getModuleCotrolerUrl() + "/TestPay", model, {
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
  
  ServiceGoToBankPaymentWebSite<TOut>(model: BankPaymentTransactionMakerDtoModel) {
    if (model == null) model = new BankPaymentTransactionMakerDtoModel();
 
    return this.http
      .post(this.baseUrl + this.getModuleCotrolerUrl() + "/GoToBankPaymentWebSite", model, {
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
