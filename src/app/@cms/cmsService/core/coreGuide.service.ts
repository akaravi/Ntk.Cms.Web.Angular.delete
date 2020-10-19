import { Injectable, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { ApiServerBase } from '../_base/apiServerBase.service';

@Injectable({
  providedIn: 'root',
})
export class CoreGuideService extends ApiServerBase<number> implements OnDestroy {
  subManager = new Subscription();

  getModuleCotrolerUrl()
  {
     return 'CoreGuide';
  }

  ngOnDestroy() {
    this.subManager.unsubscribe();
  }
 
  
}
