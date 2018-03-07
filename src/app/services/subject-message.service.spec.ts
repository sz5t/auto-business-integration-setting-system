import { TestBed, inject } from '@angular/core/testing';

import { SubjectMessageService } from './subject-message.service';

describe('SubjectMessageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SubjectMessageService]
    });
  });

  it('should be created', inject([SubjectMessageService], (service: SubjectMessageService) => {
    expect(service).toBeTruthy();
  }));
});
