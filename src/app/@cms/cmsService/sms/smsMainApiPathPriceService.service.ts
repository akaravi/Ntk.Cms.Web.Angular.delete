import { Injectable, OnDestroy } from '@angular/core';
import { ErrorExcptionResult } from 'app/@cms/cmsModels/base/errorExcptionResult';
import { Subscription } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { ApiCmsServerBase } from '../_base/apiCmsServerBase.service';
import { SmsMainApiPathPriceServiceModel } from '../../cmsModels/sms/SmsMainApiPathPriceServiceModel';

export class SmsMainApiPathPriceServiceService extends ApiCmsServerBase<SmsMainApiPathPriceServiceModel, number> {

    getModuleCotrolerUrl() {
        return 'SmsMainApiPathPriceService';
    }

}
