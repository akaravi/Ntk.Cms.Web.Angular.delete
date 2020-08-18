import { Injectable, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { AuthRenewTokenModel } from 'app/@cms/cmsModels/core/authModel';
import { ApiServerBase } from '../_base/apiServerBase.service';

@Injectable({
  providedIn: 'root',
})
export class CoreSiteCategoryModuleService extends ApiServerBase implements OnDestroy {
  subManager = new Subscription();
  getModuleCotrolerUrl()
  {
   return 'CoreSiteCategoryCmsModule';
  }

  ngOnDestroy() {
    this.subManager.unsubscribe();
  }
 

}
