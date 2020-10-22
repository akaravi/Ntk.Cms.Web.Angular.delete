import { Injectable, OnDestroy } from '@angular/core';
import { ErrorExcptionResult } from 'app/@cms/cmsModels/base/errorExcptionResult';
import { Subscription } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { ApiCmsServerBase } from '../_base/apiCmsServerBase.service';
import { SmsMainApiPathSuperSederModel } from '../../cmsModels/sms/SmsMainApiPathSuperSederModel';

export class SmsMainApiPathSuperSederService extends ApiCmsServerBase<SmsMainApiPathSuperSederModel, number> {

    getModuleCotrolerUrl() {
        return 'SmsMainApiPathSuperSeder';
    }

}
