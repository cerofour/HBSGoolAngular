/* Manejo del estado global en Angular 20 */
import { inject, Injectable, signal } from '@angular/core';
import { UserProfile } from '../auth/user-profile';
import { StorageService } from '../storage/storage.service';

interface AppState {
  userProfile: UserProfile | undefined;
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

    return `${this.appState().userProfile?.fatherLastname} ${this.appState().userProfile?.motherLastname}, ${this.appState().userProfile?.name}`
  }

  public isLoggedIn(): boolean {
    return this.appState().isLoggedIn;
  }

  public updateUserProfile(x: UserProfile) {
    this.appState.update(s => ({...s, userProfile: x}));
  }

  public updateIsLoggedIn(x: boolean) {
    this.appState.update(s => ({...s, isLoggedIn: x}));
  }

  public logout() {
    this.appState.update(s => ({...s, isLoggedIn: false, userProfile: undefined}));
  }
}