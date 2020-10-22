import { Injectable, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { ApiCmsServerBase } from '../_base/apiCmsServerBase.service';
import { FilterModel } from 'app/@cms/cmsModels/base/filterModel';
import { ErrorExcptionResult } from 'app/@cms/cmsModels/base/errorExcptionResult';
import { catchError, map, retry } from 'rxjs/operators';
import { BankPaymentTransactionLogModel } from 'app/@cms/cmsModels/BankPayment/bankPaymentTransactionLogModel';


export class BankPaymentTransactionLogService extends ApiCmsServerBase<BankPaymentTransactionLogModel,number> implements OnDestroy {
  

  getModuleCotrolerUrl()
  {
     return 'BankPaymentTransactionLog';
  }

}
