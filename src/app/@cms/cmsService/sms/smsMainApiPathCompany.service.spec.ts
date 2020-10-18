/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SmsMainApiPathCompanyService } from './smsMainApiPathCompany.service';

describe('Service: SmsMainApiPathCompany', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SmsMainApiPathCompanyService]
    });
  });

  it('should ...', inject([SmsMainApiPathCompanyService], (service: SmsMainApiPathCompanyService) => {
    expect(service).toBeTruthy();
  }));
});
