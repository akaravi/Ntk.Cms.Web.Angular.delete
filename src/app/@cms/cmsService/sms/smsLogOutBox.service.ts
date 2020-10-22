import { Injectable, OnDestroy } from '@angular/core';
import { ErrorExcptionResult } from 'app/@cms/cmsModels/base/errorExcptionResult';
import { Subscription } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { ApiCmsServerBase } from '../_base/apiCmsServerBase.service';
import { SmsLogOutBoxModel } from '../../cmsModels/sms/SmsLogOutBoxModel';

export class SmsLogOutBoxService extends ApiCmsServerBase<SmsLogOutBoxModel, number> {

    getModuleCotrolerUrl() {
        return 'SmsLogOutBox';
    }

}
