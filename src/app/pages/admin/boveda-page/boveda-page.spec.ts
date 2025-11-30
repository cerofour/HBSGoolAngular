import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BovedaPage } from './boveda-page';

describe('BovedaPage', () => {
  let component: BovedaPage;
  let fixture: ComponentFixture<BovedaPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BovedaPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BovedaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
