import { Injectable, OnDestroy } from '@angular/core';
import { ErrorExcptionResult } from 'app/@cms/cmsModels/base/errorExcptionResult';
import { Subscription } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { ApiCmsServerBase } from '../_base/apiCmsServerBase.service';
import { SmsMainApiPathModel } from '../../cmsModels/sms/smsMainApiPathModel';

export class SmsMainApiPathService extends ApiCmsServerBase<SmsMainApiPathModel, number> {

  getModuleCotrolerUrl() {
    return 'SmsMainApiPath';
  }

}
