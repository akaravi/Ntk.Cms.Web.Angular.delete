/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SmsLogOutBoxDetailService } from './smsLogOutBoxDetail.service';

describe('Service: SmsLogOutBoxDetail', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SmsLogOutBoxDetailService]
    });
  });

  it('should ...', inject([SmsLogOutBoxDetailService], (service: SmsLogOutBoxDetailService) => {
    expect(service).toBeTruthy();
  }));
});
