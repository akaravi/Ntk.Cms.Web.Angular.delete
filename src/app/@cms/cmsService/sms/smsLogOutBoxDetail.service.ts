import { Injectable, OnDestroy } from '@angular/core';
import { ErrorExcptionResult } from 'app/@cms/cmsModels/base/errorExcptionResult';
import { Subscription } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { ApiCmsServerBase } from '../_base/apiCmsServerBase.service';
import { SmsLogOutBoxDetailModel } from '../../cmsModels/sms/SmsLogOutBoxDetailModel';

export class SmsLogOutBoxDetailService extends ApiCmsServerBase<SmsLogOutBoxDetailModel, number> {

    getModuleCotrolerUrl() {
        return 'SmsLogOutBoxDetail';
    }

}
