import { Injectable, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { ApiServerBase } from '../_base/apiServerBase.service';

@Injectable({
  providedIn: 'root',
})
export class NewsTagService extends ApiServerBase implements OnDestroy {
  subManager = new Subscription();

  getModuleCotrolerUrl()
  {
     return 'NewsTag';
  }

  ngOnDestroy() {
    this.subManager.unsubscribe();
  }
 
  
}
