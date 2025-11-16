import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListadoCajasComponent } from './listadocajas.component';

describe('ListadoCajasComponent', () => {
  let component: ListadoCajasComponent;
  let fixture: ComponentFixture<ListadoCajasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListadoCajasComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ListadoCajasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
