/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SmsMainApiPathPermissionService } from './smsMainApiPathPermission.service';

describe('Service: SmsMainApiPathPermission', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SmsMainApiPathPermissionService]
    });
  });

  it('should ...', inject([SmsMainApiPathPermissionService], (service: SmsMainApiPathPermissionService) => {
    expect(service).toBeTruthy();
  }));
});
