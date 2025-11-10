import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CajeroService } from './cajero.service';

describe('CajeroService', () => {
  let service: CajeroService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CajeroService]
    });
    service = TestBed.inject(CajeroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
