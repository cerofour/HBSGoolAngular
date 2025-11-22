import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CerrarSesionCajeroComponent } from './cerrarsesioncajero.component';

describe('CerrarSesionCajeroComponent', () => {
  let fixture: ComponentFixture<CerrarSesionCajeroComponent>;
  let component: CerrarSesionCajeroComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CerrarSesionCajeroComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CerrarSesionCajeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});