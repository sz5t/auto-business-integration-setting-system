import { TestBed, inject } from '@angular/core/testing';

import { FixComponetLifehookService } from './fix-componet-lifehook.service';

describe('FixComponetLifehookService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FixComponetLifehookService]
    });
  });

  it('should be created', inject([FixComponetLifehookService], (service: FixComponetLifehookService) => {
    expect(service).toBeTruthy();
  }));
});
