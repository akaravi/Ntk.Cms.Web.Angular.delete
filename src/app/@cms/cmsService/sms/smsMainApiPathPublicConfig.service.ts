import { Injectable, OnDestroy } from '@angular/core';
import { ErrorExcptionResult } from 'app/@cms/cmsModels/base/errorExcptionResult';
import { Subscription } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { ApiCmsServerBase } from '../_base/apiCmsServerBase.service';
import { SmsMainApiPathPublicConfigModel } from '../../cmsModels/sms/SmsMainApiPathPublicConfigModel';

export class SmsMainApiPathPublicConfigService extends ApiCmsServerBase<SmsMainApiPathPublicConfigModel, number> {

    getModuleCotrolerUrl() {
        return 'SmsMainApiPathPublicConfig';
    }

}
