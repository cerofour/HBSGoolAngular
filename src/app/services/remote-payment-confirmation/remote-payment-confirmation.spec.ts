import { TestBed } from '@angular/core/testing';

import { RemotePaymentConfirmation } from './remote-payment-confirmation';

describe('RemotePaymentConfirmation', () => {
  let service: RemotePaymentConfirmation;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RemotePaymentConfirmation);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
