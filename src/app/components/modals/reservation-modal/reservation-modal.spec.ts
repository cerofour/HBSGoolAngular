import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReservationModal } from './reservation-modal';

describe('ReservationCashierModal', () => {
  let component: ReservationModal;
  let fixture: ComponentFixture<ReservationModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservationModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
