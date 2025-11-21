import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { RemotePaymentConfirmationService } from './remote-payment-confirmation';

describe('RemotePaymentConfirmationService', () => {
  let service: RemotePaymentConfirmationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RemotePaymentConfirmationService],
    });
    service = TestBed.inject(RemotePaymentConfirmationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
