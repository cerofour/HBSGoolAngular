import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationCardUser } from './reservation-card-user';

describe('ReservationCardUser', () => {
  let component: ReservationCardUser;
  let fixture: ComponentFixture<ReservationCardUser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservationCardUser]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationCardUser);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
