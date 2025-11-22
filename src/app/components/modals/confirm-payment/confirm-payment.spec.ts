import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmPayment } from './confirm-payment';

describe('ConfirmPayment', () => {
  let component: ConfirmPayment;
  let fixture: ComponentFixture<ConfirmPayment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmPayment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmPayment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
