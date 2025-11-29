import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteCierrePage } from './reporte-cierre-page';

describe('ReporteCierrePage', () => {
  let component: ReporteCierrePage;
  let fixture: ComponentFixture<ReporteCierrePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReporteCierrePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReporteCierrePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
