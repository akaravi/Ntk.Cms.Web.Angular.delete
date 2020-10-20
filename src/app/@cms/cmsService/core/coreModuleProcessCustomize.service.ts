import { Injectable, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiServerBase } from '../_base/apiServerBase.service';

@Injectable({
  providedIn: 'root',
})
export class CoreModuleProcessCustomizeService extends ApiServerBase<any,number> implements OnDestroy {
  subManager = new Subscription();

  getModuleCotrolerUrl()
  {
     return 'CoreModuleProcessCustomize';
  }

  ngOnDestroy() {
    this.subManager.unsubscribe();
  }
 
  
}
