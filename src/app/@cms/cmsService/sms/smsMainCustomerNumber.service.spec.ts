/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SmsMainCustomerNumberService } from './smsMainCustomerNumber.service';

describe('Service: SmsMainCustomerNumber', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SmsMainCustomerNumberService]
    });
  });

  it('should ...', inject([SmsMainCustomerNumberService], (service: SmsMainCustomerNumberService) => {
    expect(service).toBeTruthy();
  }));
});
