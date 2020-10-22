import { Injectable, OnDestroy } from '@angular/core';
import { ErrorExcptionResult } from 'app/@cms/cmsModels/base/errorExcptionResult';
import { Subscription } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { ApiCmsServerBase } from '../_base/apiCmsServerBase.service';
import { SmsMainCustomerNumberModel } from '../../cmsModels/sms/SmsMainCustomerNumberModel';

export class SmsMainCustomerNumberService extends ApiCmsServerBase<SmsMainCustomerNumberModel, number> {

    getModuleCotrolerUrl() {
        return 'SmsMainCustomerNumber';
    }

}
