import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationCardAdmin } from './reservation-card-admin';

describe('ReservationCardAdmin', () => {
  let component: ReservationCardAdmin;
  let fixture: ComponentFixture<ReservationCardAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservationCardAdmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationCardAdmin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
