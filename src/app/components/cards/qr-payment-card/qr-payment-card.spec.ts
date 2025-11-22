import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrPaymentCard } from './qr-payment-card';

describe('QrPaymentCard', () => {
  let component: QrPaymentCard;
  let fixture: ComponentFixture<QrPaymentCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QrPaymentCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QrPaymentCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
