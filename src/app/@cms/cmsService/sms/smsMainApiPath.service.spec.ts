/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SmsMainApiPathService } from './smsMainApiPath.service';

describe('Service: SmsMainApiPath', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SmsMainApiPathService]
    });
  });

  it('should ...', inject([SmsMainApiPathService], (service: SmsMainApiPathService) => {
    expect(service).toBeTruthy();
  }));
});
