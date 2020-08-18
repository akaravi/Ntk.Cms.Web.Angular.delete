import { Injectable, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { ApiServerBase } from '../_base/apiServerBase.service';

@Injectable({
  providedIn: 'root',
})
export class NewsContentParameterTypeService extends ApiServerBase implements OnDestroy {
  subManager = new Subscription();

  getModuleCotrolerUrl()
  {
     return 'NewsContentParameterType';
  }

  ngOnDestroy() {
    this.subManager.unsubscribe();
  }
 
  
}
