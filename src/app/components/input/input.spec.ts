import { TestBed } from '@angular/core/testing';
import { MyInput } from './input';

describe('Input', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyInput],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(MyInput);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
