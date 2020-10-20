import { Injectable, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { ApiCmsServerBase } from '../_base/apiCmsServerBase.service';

@Injectable({
  providedIn: 'root',
})
export class CoreSiteCategoryCmsModuleService extends ApiCmsServerBase<any,number> implements OnDestroy {
  subManager = new Subscription();

  getModuleCotrolerUrl()
  {
     return 'CoreSiteCategoryCmsModule';
  }

  ngOnDestroy() {
    this.subManager.unsubscribe();
  }
 
  
}
