import { Injectable, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { ApiServerBase } from '../_base/apiServerBase.service';

@Injectable({
  providedIn: 'root',
})
export class NewsShareReciverCategoryService extends ApiServerBase<number> implements OnDestroy {
  subManager = new Subscription();

  getModuleCotrolerUrl()
  {
     return 'NewsShareReciverCategory';
  }

  ngOnDestroy() {
    this.subManager.unsubscribe();
  }
 
  
}
