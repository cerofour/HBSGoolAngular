import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SesionCajeroService } from './sesion-cajero.service';

describe('SesionCajeroService', () => {
  let service: SesionCajeroService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SesionCajeroService],
    });
    service = TestBed.inject(SesionCajeroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});