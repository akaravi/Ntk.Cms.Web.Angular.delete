import { Injectable, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { map, catchError, retry } from "rxjs/operators";
import { ErrorExcptionResult } from 'app/@cms/cmsModels/base/errorExcptionResult';
import { ApiCmsServerBase } from '../_base/apiCmsServerBase.service';
import { LinkManagementTargetShortLinkGetDtoModel } from 'app/@cms/cmsDtoModels/linkManagement/linkManagementTargetShortLinkGetDtoModel';
import { LinkManagementTargetShortLinkGetResponceModel } from 'app/@cms/cmsDtoModels/linkManagement/linkManagementTargetShortLinkGetResponceModel';
import { LinkManagementTargetShortLinkSetDtoModel } from 'app/@cms/cmsDtoModels/linkManagement/linkManagementTargetShortLinkSetDtoModel';
import { LinkManagementTargetShortLinkSetResponceModel } from 'app/@cms/cmsDtoModels/linkManagement/linkManagementTargetShortLinkSetResponceModel';



export class LinkManagementTargetService extends ApiCmsServerBase<any,number> implements OnDestroy {
  subManager = new Subscription();

  getModuleCotrolerUrl()
  {
     return 'LinkManagementTarget';
  }

  ngOnDestroy() {
    this.subManager.unsubscribe();
  }
 
  ServiceShortLinkSet( model: LinkManagementTargetShortLinkSetDtoModel) {
    if (model == null) model = new LinkManagementTargetShortLinkSetDtoModel();
 
    return this.http
      .post(this.baseUrl + this.getModuleCotrolerUrl() + "/ShortLinkSet/",model, {
        headers: this.getHeaders(),
      })
      .pipe(
        retry(this.configApiRetry),
        catchError(this.handleError),
        map((ret: ErrorExcptionResult<LinkManagementTargetShortLinkSetResponceModel>) => {
          return this.errorExcptionResultCheck(ret);
        })
      );
  }
  ServiceShortLinkGet( model: LinkManagementTargetShortLinkGetDtoModel) {
    if (model == null) model = new LinkManagementTargetShortLinkGetDtoModel();
 
    return this.http
      .post(this.baseUrl + this.getModuleCotrolerUrl() + "/ShortLinkSet/",model, {
        headers: this.getHeaders(),
      })
      .pipe(
        retry(this.configApiRetry),
        catchError(this.handleError),
        map((ret: ErrorExcptionResult<LinkManagementTargetShortLinkGetResponceModel>) => {
          return this.errorExcptionResultCheck(ret);
        })
      );
  }
}
