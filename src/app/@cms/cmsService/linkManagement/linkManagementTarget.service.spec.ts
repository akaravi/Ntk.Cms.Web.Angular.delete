/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LinkManagementTargetService } from './linkManagementTarget.service';

describe('Service: LinkManagementTargetService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LinkManagementTargetService]
    });
  });

  it('should ...', inject([LinkManagementTargetService], (service: LinkManagementTargetService) => {
    expect(service).toBeTruthy();
  }));
});
