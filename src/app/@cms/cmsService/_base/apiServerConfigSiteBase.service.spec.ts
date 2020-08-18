/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ApiServerConfigSiteBase } from './apiServerConfigSiteBase.service';

describe('Service: ApiServerConfigSiteBase', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiServerConfigSiteBase]
    });
  });

  it('should ...', inject([ApiServerConfigSiteBase], (service: ApiServerConfigSiteBase) => {
    expect(service).toBeTruthy();
  }));
});
