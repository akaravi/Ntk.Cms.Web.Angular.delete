import { Injectable, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { AuthRenewTokenModel } from 'app/@cms/cmsModels/core/authModel';
import { ApiCmsServerBase } from '../_base/apiCmsServerBase.service';

@Injectable({
  providedIn: 'root',
})
export class CoreSiteCategoryModuleService extends ApiCmsServerBase<any,number> implements OnDestroy {
  subManager = new Subscription();
  getModuleCotrolerUrl()
  {
   return 'CoreSiteCategoryCmsModule';
  }

  ngOnDestroy() {
    this.subManager.unsubscribe();
  }
 

}
