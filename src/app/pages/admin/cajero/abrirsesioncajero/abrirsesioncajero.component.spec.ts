import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AbrirSesionCajeroComponent } from './abrirsesioncajero.component';

describe('AbrirSesionCajeroComponent', () => {
  let fixture: ComponentFixture<AbrirSesionCajeroComponent>;
  let component: AbrirSesionCajeroComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbrirSesionCajeroComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AbrirSesionCajeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});