import { Injectable, OnDestroy } from '@angular/core';
import { ErrorExcptionResult } from 'app/@cms/cmsModels/base/errorExcptionResult';
import { Subscription } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { ApiCmsServerBase } from '../_base/apiCmsServerBase.service';
import { SmsLogOutBoxDetailBulkModel } from '../../cmsModels/sms/SmsLogOutBoxDetailBulkModel';

export class SmsLogOutBoxDetailBulkService extends ApiCmsServerBase<SmsLogOutBoxDetailBulkModel, number> {

    getModuleCotrolerUrl() {
        return 'SmsLogOutBoxDetailBulk';
    }

}
