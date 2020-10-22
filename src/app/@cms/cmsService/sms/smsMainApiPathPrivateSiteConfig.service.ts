import { Injectable, OnDestroy } from '@angular/core';
import { ErrorExcptionResult } from 'app/@cms/cmsModels/base/errorExcptionResult';
import { Subscription } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { ApiCmsServerBase } from '../_base/apiCmsServerBase.service';
import { SmsMainApiPathPrivateSiteConfigModel } from '../../cmsModels/sms/SmsMainApiPathPrivateSiteConfigModel';

export class SmsMainApiPathPrivateSiteConfigService extends ApiCmsServerBase<SmsMainApiPathPrivateSiteConfigModel, number> {

    getModuleCotrolerUrl() {
        return 'SmsMainApiPathPrivateSiteConfig';
    }

}
