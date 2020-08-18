import { Injectable, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { ApiServerBase } from '../_base/apiServerBase.service';

@Injectable({
  providedIn: 'root',
})
export class NewsCategoryService extends ApiServerBase implements OnDestroy {
  subManager = new Subscription();

  getModuleCotrolerUrl()
  {
     return 'NewsCategoryTag';
  }

  ngOnDestroy() {
    this.subManager.unsubscribe();
  }
 
  
}
