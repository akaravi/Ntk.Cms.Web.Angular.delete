/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SmsLogOutBoxService } from './smsLogOutBox.service';

describe('Service: SmsLogOutBox', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SmsLogOutBoxService]
    });
  });

  it('should ...', inject([SmsLogOutBoxService], (service: SmsLogOutBoxService) => {
    expect(service).toBeTruthy();
  }));
});
