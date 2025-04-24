import { TestBed } from '@angular/core/testing';

import { AdoptantesService } from './adoptantes.service';

describe('AdoptantesService', () => {
  let service: AdoptantesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdoptantesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
