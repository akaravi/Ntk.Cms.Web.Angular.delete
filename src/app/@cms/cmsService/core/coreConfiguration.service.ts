import { Injectable, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { ApiServerConfigSiteBase } from '../_base/apiServerConfigSiteBase.service';


export class CoreConfigurationService extends ApiServerConfigSiteBase implements OnDestroy {
  subManager = new Subscription();

  getModuleCotrolerUrl()
  {
     return 'CoreConfiguration';
  }

  ngOnDestroy() {
    this.subManager.unsubscribe();
  }
 
  
}
