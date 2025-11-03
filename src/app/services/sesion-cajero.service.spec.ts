import { TestBed } from '@angular/core/testing';
import { SesionCajeroService } from './sesion-cajero.service';

describe('SesionCajeroService', () => {
  let service: SesionCajeroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SesionCajeroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});