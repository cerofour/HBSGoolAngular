import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { InicioSesionCajeroService } from './inicio-sesion-cajero.service';

describe('InicioSesionCajeroService', () => {
  let service: InicioSesionCajeroService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [InicioSesionCajeroService]
    });
    service = TestBed.inject(InicioSesionCajeroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
