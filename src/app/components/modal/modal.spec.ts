import { TestBed } from '@angular/core/testing';
import { Modal } from './modal';

describe('Modal', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Modal],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(Modal);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should change isOpen with open/close', () => {
    const fixture = TestBed.createComponent(Modal);
    const component = fixture.componentInstance;
    expect(component.isOpen()).toBeFalse();
    component.open();
    expect(component.isOpen()).toBeTrue();
    component.close();
    expect(component.isOpen()).toBeFalse();
  });
});
