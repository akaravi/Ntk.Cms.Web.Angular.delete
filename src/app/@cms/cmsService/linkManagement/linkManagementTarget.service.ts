import { Injectable, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { map, catchError, retry } from "rxjs/operators";
import { ErrorExcptionResult } from 'app/@cms/cmsModels/base/errorExcptionResult';
import { ApiServerBase } from '../_base/apiServerBase.service';
import { FilterModel } from 'app/@cms/cmsModels/base/filterModel';
import { LinkManagementTargetShortLinkSetDtoModel } from 'app/@cms/cmsModels/linkManagement/linkManagementTargetShortLinkSetDtoModel';
import { LinkManagementTargetShortLinkGetDtoModel } from 'app/@cms/cmsModels/linkManagement/linkManagementTargetShortLinkGetDtoModel';
import { LinkManagementTargetShortLinkSetResponceModel } from 'app/@cms/cmsModels/linkManagement/linkManagementTargetShortLinkSetResponceModel';
import { LinkManagementTargetShortLinkGetResponceModel } from 'app/@cms/cmsModels/linkManagement/linkManagementTargetShortLinkGetResponceModel';

@Injectable({
  providedIn: 'root',
})
export class LinkManagementTargetService extends ApiServerBase<any,number> implements OnDestroy {
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
