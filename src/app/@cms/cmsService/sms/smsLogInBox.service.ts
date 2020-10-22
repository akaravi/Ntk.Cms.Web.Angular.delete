import { Injectable, OnDestroy } from '@angular/core';
import { ErrorExcptionResult } from 'app/@cms/cmsModels/base/errorExcptionResult';
import { Subscription } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { ApiCmsServerBase } from '../_base/apiCmsServerBase.service';
import { SmsLogInBoxModel } from '../../cmsModels/sms/smsLogInBoxModel';

export class SmsLogInBoxService extends ApiCmsServerBase<SmsLogInBoxModel, number> {

    getModuleCotrolerUrl() {
        return 'SmsLogInBox';
    }

}
