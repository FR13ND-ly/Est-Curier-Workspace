import { TestBed } from '@angular/core/testing';

import { OcupationService } from './ocupation.service';

describe('OcupationService', () => {
  let service: OcupationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OcupationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
