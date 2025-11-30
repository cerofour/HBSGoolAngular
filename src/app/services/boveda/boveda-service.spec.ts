import { TestBed } from '@angular/core/testing';

import { BovedaService } from './boveda-service';

describe('BovedaService', () => {
  let service: BovedaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BovedaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
