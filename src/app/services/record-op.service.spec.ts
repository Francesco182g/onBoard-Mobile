import { TestBed } from '@angular/core/testing';

import { RecordOpService } from './record-op.service';

describe('RecordOpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecordOpService = TestBed.get(RecordOpService);
    expect(service).toBeTruthy();
  });
});
