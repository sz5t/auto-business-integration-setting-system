import {TestBed, inject} from '@angular/core/testing';

import {ClientStorageService} from './client-storage.service';

describe('ClientStorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClientStorageService]
    });
  });

  it('should be created', inject([ClientStorageService], (service: ClientStorageService) => {
    expect(service).toBeTruthy();
  }));
});
