import { TestBed } from '@angular/core/testing';

import { MongoConnectService } from './mongo-connect.service';

describe('MongoConnectService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MongoConnectService = TestBed.get(MongoConnectService);
    expect(service).toBeTruthy();
  });
});
