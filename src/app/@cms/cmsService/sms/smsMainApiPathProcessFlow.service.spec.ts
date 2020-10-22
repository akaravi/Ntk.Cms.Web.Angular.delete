/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SmsMainApiPathProcessFlowService } from './smsMainApiPathProcessFlow.service';

describe('Service: SmsMainApiPathProcessFlow', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SmsMainApiPathProcessFlowService]
    });
  });

  it('should ...', inject([SmsMainApiPathProcessFlowService], (service: SmsMainApiPathProcessFlowService) => {
    expect(service).toBeTruthy();
  }));
});
