import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AppStateService } from '../services/app-state/app-state';
import { RedirectCommand } from '@angular/router';

export const isLoggedInGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const appState = inject(AppStateService);

  // auth / authorización exitosa
  if (appState.isLoggedIn())
    return true;

  return new RedirectCommand(router.parseUrl("/login"))
};
