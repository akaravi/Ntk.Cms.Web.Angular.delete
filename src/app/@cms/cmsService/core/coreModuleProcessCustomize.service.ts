import { Injectable, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiCmsServerBase } from '../_base/apiCmsServerBase.service';


export class CoreModuleProcessCustomizeService extends ApiCmsServerBase<any,number> implements OnDestroy {
  subManager = new Subscription();

  getModuleCotrolerUrl()
  {
     return 'CoreModuleProcessCustomize';
  }

  ngOnDestroy() {
    this.subManager.unsubscribe();
  }
 
  
}
