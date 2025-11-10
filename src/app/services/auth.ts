import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { UserProfile } from './auth/user-profile';
import { LoginResponse } from './auth/login-response';
import { AppStateService } from './app-state/app-state';
import { StorageService } from './storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private appState = inject(AppStateService);
  private http = inject(HttpClient);
  private storage = inject(StorageService);

  private apiPath = "http://152.67.46.79:8080";

  login(email: string, password: string): Observable<LoginResponse> {

    return this.http
      .post<LoginResponse>(`${this.apiPath}/api/auth/login`, {email: email, contrasena: password})
      .pipe(
        tap(res => {
          this.saveToken(res.auth.jwtToken);
          this.lazyGetProfile(res);
        })
      )
  }

  logout() {
    this.storage.removeItem('jwtToken');
    this.storage.removeItem('loggedIn');
    this.appState.logout();
  }

  /**
   * Solicita el perfil de usuario basado solamente si el objeto userProfile es undefined.
   */
  private lazyGetProfile(res: LoginResponse) {
    if (this.appState.getUserProfile() === undefined) {
      this.appState.updateUserProfile(res.profile);
      this.appState.updateIsLoggedIn(true);
    }
  }

  private saveToken(token: string) {
    this.storage.setItem('jwtToken', token);
    this.storage.setItem('loggedIn', '1');
  }
}
