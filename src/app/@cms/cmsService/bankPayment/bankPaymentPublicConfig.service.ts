import { Injectable, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { ApiCmsServerBase } from '../_base/apiCmsServerBase.service';
import { FilterModel } from 'app/@cms/cmsModels/base/filterModel';
import { ErrorExcptionResult } from 'app/@cms/cmsModels/base/errorExcptionResult';
import { catchError, map, retry } from 'rxjs/operators';
import { BankPaymentPublicConfigModel } from 'app/@cms/cmsModels/BankPayment/bankPaymentPublicConfigModel';


export class BankPaymentPublicConfigService extends ApiCmsServerBase<BankPaymentPublicConfigModel,number> implements OnDestroy {

  getModuleCotrolerUrl()
  {
     return 'BankPaymentPublicConfig';
  }

}
