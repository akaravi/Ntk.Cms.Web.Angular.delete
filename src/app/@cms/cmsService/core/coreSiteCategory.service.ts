import { Injectable, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { ApiCmsServerBase } from '../_base/apiCmsServerBase.service';

export class CoreSiteCategoryService extends ApiCmsServerBase<any,number> implements OnDestroy {
  subManager = new Subscription();
  getModuleCotrolerUrl()
  {
   return 'CoreSiteCategory';
  }

  ngOnDestroy() {
    this.subManager.unsubscribe();
  }
 

}
