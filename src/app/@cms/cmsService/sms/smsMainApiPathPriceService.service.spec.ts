/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SmsMainApiPathPriceServiceService } from './smsMainApiPathPriceService.service';

describe('Service: SmsMainApiPathPriceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SmsMainApiPathPriceServiceService]
    });
  });

  it('should ...', inject([SmsMainApiPathPriceServiceService], (service: SmsMainApiPathPriceServiceService) => {
    expect(service).toBeTruthy();
  }));
});
