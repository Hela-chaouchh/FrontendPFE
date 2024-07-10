import { TestBed } from '@angular/core/testing';

import { ConfigStoreAttributsService } from './config-store-attributs.service';

describe('ConfigStoreAttributsService', () => {
  let service: ConfigStoreAttributsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfigStoreAttributsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
