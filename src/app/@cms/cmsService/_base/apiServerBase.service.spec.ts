/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ApiServerBase } from './apiServerBase.service';

describe('Service: ApiServerBase', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiServerBase]
    });
  });

  it('should ...', inject([ApiServerBase], (service: ApiServerBase) => {
    expect(service).toBeTruthy();
  }));
});
