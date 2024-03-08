import { TestBed } from '@angular/core/testing';

import { TransformStudentDataService } from './transform-student-data.service';

describe('TransformStudentDataService', () => {
  let service: TransformStudentDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransformStudentDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
