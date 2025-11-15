import { inject } from '@angular/core';
import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { AppStateService } from '../services/app-state/app-state';

export const isCashierGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const appState = inject(AppStateService);

  // auth / authorización exitosa
  if (appState.isLoggedIn() && appState.getUserProfile()?.rol === "CASHIER" || appState.getUserProfile()?.rol === "ADMIN")
    return true;

  return new RedirectCommand(router.parseUrl("/"))
};
