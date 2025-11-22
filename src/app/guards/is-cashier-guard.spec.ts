import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { isCashierGuard } from './is-cashier-guard';

describe('isCashierGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => isCashierGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
