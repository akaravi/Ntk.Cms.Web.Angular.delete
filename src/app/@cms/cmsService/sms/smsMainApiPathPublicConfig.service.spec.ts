/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SmsMainApiPathPublicConfigService } from './smsMainApiPathPublicConfig.service';

describe('Service: SmsMainApiPathPublicConfig', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SmsMainApiPathPublicConfigService]
    });
  });

  it('should ...', inject([SmsMainApiPathPublicConfigService], (service: SmsMainApiPathPublicConfigService) => {
    expect(service).toBeTruthy();
  }));
});
