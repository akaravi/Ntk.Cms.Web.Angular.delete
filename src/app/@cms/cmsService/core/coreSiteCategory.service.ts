import { Injectable, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { ApiServerBase } from '../_base/apiServerBase.service';
@Injectable({
  providedIn: 'root',
})
export class CoreSiteCategoryService extends ApiServerBase<any,number> implements OnDestroy {
  subManager = new Subscription();
  getModuleCotrolerUrl()
  {
   return 'CoreSiteCategory';
  }

  ngOnDestroy() {
    this.subManager.unsubscribe();
  }
 

}
