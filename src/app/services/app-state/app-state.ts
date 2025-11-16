/* Manejo del estado global en Angular 20 */
import { inject, Injectable, signal, computed } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { LoginProfileResponse } from '../auth/login-response';

export interface CashierSessionInfo {
  sessionId: number;
  initialMoneyAmount: number;
  openingDate: string;
}

interface AppState {
  userProfile: LoginProfileResponse | undefined;
  cashierSession: CashierSessionInfo | undefined;
  isLoggedIn: boolean;
}

const initialState: AppState = {
  userProfile: undefined,
  cashierSession: undefined,
  isLoggedIn: false,
};

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  private readonly appState = signal<AppState>(initialState)
  private storage = inject(StorageService);

  public getUserProfile() {
    return this.appState().userProfile;
  }

  public getToken(): string | null {
    return this.storage.getItem('jwtToken');
  }

  public getFullName() {

    if (!this.appState().isLoggedIn) {
      return "Not logged in";
    }

    return `${this.appState().userProfile?.apellidoPaterno} ${this.appState().userProfile?.apellidoMaterno}, ${this.appState().userProfile?.nombre}`
  }

  public isLoggedIn(): boolean {
    return this.appState().isLoggedIn;
  }

  public updateUserProfile(x: LoginProfileResponse) {
    this.appState.update(s => ({...s, userProfile: x}));
  }

  public updateCashierSession(x: CashierSessionInfo) {
    this.appState.update(s => ({...s, cashierSession: x}));
  }

  public getCashierSession() {
    return this.appState().cashierSession;
  }

  public updateIsLoggedIn(x: boolean) {
    this.appState.update(s => ({...s, isLoggedIn: x}));
  }

  public logout() {
    this.appState.update(s => ({...s, cashierSession: undefined, isLoggedIn: false, userProfile: undefined}));
  }

  // Signal pública (solo lectura) para reaccionar a cambios de perfil
  public userProfileSignal() {
    return computed(() => this.appState().userProfile);
  }
}
