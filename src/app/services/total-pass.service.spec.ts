import { TestBed } from '@angular/core/testing';

import { TotalPassService } from './total-pass.service';

describe('TotalPassService', () => {
  let service: TotalPassService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TotalPassService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
