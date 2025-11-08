import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentReminderCard } from './payment-reminder-card';

describe('PaymentReminderCard', () => {
  let component: PaymentReminderCard;
  let fixture: ComponentFixture<PaymentReminderCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentReminderCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentReminderCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
