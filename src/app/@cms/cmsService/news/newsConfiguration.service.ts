import { Injectable, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { ApiServerConfigSiteBase } from '../_base/apiServerConfigSiteBase.service';

@Injectable({
  providedIn: 'root',
})
export class NewsConfigurationService extends ApiServerConfigSiteBase implements OnDestroy {
  subManager = new Subscription();

  getModuleCotrolerUrl()
  {
     return 'NewsConfiguration';
  }

  ngOnDestroy() {
    this.subManager.unsubscribe();
  }
 
  
}
