/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CmsToastrServiceService } from './cmsToastrService.service';

describe('Service: CmsToastrService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CmsToastrServiceService]
    });
  });

  it('should ...', inject([CmsToastrServiceService], (service: CmsToastrServiceService) => {
    expect(service).toBeTruthy();
  }));
});
