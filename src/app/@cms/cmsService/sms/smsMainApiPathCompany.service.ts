import { Injectable, OnDestroy } from '@angular/core';
import { ErrorExcptionResult } from 'app/@cms/cmsModels/base/errorExcptionResult';
import { SmsMainApiPathCompanyModel } from 'app/@cms/cmsModels/sms/smsMainApiCompanyModel';
import { Subscription } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { ApiCmsServerBase } from '../_base/apiCmsServerBase.service';


export class SmsMainApiPathCompanyService extends ApiCmsServerBase<SmsMainApiPathCompanyModel, number> {

  getModuleCotrolerUrl() {
    return 'SmsMainApiPathCompany';
  }

}
