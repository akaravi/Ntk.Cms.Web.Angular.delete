import { Injectable, OnDestroy } from '@angular/core';
import { ErrorExcptionResult } from 'app/@cms/cmsModels/base/errorExcptionResult';
import { Subscription } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { ApiCmsServerBase } from '../_base/apiCmsServerBase.service';
import { SmsMainApiPathProcessFlowLogModel } from '../../cmsModels/sms/SmsMainApiPathProcessFlowLogModel';

export class SmsMainApiPathProcessFlowLogService extends ApiCmsServerBase<SmsMainApiPathProcessFlowLogModel, number> {

    getModuleCotrolerUrl() {
        return 'SmsMainApiPathProcessFlowLog';
    }

}
