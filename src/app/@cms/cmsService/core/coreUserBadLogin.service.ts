import { Injectable, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { ApiCmsServerBase } from '../_base/apiCmsServerBase.service';


export class CoreUserBadLoginService extends ApiCmsServerBase<any,number> implements OnDestroy {
  subManager = new Subscription();
  getModuleCotrolerUrl()
  {
   return 'CoreUserBadLogin';
  }

  ngOnDestroy() {
    this.subManager.unsubscribe();
  }
 

}
