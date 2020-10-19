import { Injectable, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { ApiServerBase } from '../_base/apiServerBase.service';

@Injectable({
  providedIn: 'root',
})
export class NewsContentAndParameterValueService extends ApiServerBase<number> implements OnDestroy {
  subManager = new Subscription();

  getModuleCotrolerUrl()
  {
     return 'NewsContentAndParameterValue';
  }

  ngOnDestroy() {
    this.subManager.unsubscribe();
  }
 
  
}
