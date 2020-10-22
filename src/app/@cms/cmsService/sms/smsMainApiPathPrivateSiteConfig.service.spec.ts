/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SmsMainApiPathPrivateSiteConfigService } from './smsMainApiPathPrivateSiteConfig.service';

describe('Service: SmsMainApiPathPrivateSiteConfig', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SmsMainApiPathPrivateSiteConfigService]
    });
  });

  it('should ...', inject([SmsMainApiPathPrivateSiteConfigService], (service: SmsMainApiPathPrivateSiteConfigService) => {
    expect(service).toBeTruthy();
  }));
});
