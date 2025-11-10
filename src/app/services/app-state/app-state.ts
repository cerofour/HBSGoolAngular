/* Manejo del estado global en Angular 20 */
import { inject, Injectable, signal } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { LoginProfileResponse } from '../auth/login-response';

interface AppState {
  userProfile: LoginProfileResponse | undefined;
  isLoggedIn: boolean;
}

const initialState: AppState = {
  userProfile: undefined,
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

  public updateIsLoggedIn(x: boolean) {
    this.appState.update(s => ({...s, isLoggedIn: x}));
  }

  public logout() {
    this.appState.update(s => ({...s, isLoggedIn: false, userProfile: undefined}));
  }
}