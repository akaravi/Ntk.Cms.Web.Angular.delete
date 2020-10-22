/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SmsLogInBoxService } from './smsLogInBox.service';

describe('Service: SmsLogInBox', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SmsLogInBoxService]
    });
  });

  it('should ...', inject([SmsLogInBoxService], (service: SmsLogInBoxService) => {
    expect(service).toBeTruthy();
  }));
});
