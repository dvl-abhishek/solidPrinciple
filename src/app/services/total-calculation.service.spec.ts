import { TestBed } from '@angular/core/testing';

import { TotalStudentService } from './total-student.service';

describe('TotalStudentService', () => {
  let service: TotalStudentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TotalStudentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
