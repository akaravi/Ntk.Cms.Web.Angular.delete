/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SmsMainApiPathProcessFlowLogService } from './smsMainApiPathProcessFlowLog.service';

describe('Service: SmsMainApiPathProcessFlowLog', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SmsMainApiPathProcessFlowLogService]
    });
  });

  it('should ...', inject([SmsMainApiPathProcessFlowLogService], (service: SmsMainApiPathProcessFlowLogService) => {
    expect(service).toBeTruthy();
  }));
});
