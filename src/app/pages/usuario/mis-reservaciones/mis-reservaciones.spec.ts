import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisReservaciones } from './mis-reservaciones';

describe('MisReservaciones', () => {
  let component: MisReservaciones;
  let fixture: ComponentFixture<MisReservaciones>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MisReservaciones]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MisReservaciones);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
