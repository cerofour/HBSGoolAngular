import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferPaymentCard } from './transfer-payment-card';

describe('TransferPaymentCard', () => {
  let component: TransferPaymentCard;
  let fixture: ComponentFixture<TransferPaymentCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransferPaymentCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransferPaymentCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
