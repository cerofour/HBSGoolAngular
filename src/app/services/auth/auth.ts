import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { LoginProfileResponse, AuthResponse, LoginResponse } from './login-response';
import { AppStateService } from '../app-state/app-state';
import { StorageService } from '../storage/storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private appState = inject(AppStateService);
  private http = inject(HttpClient);
  private storage = inject(StorageService);
  private route = inject(Router);

  private apiPath = "http://152.67.46.79:8080";

  login(email: string, password: string): Observable<LoginResponse> {

    return this.http
      .post<LoginResponse>(`${this.apiPath}/api/auth/login`, {email: email, contrasena: password})
      .pipe(
        tap(res => {
          this.saveToken(res.auth);
          this.lazyGetProfile(res);
        })
      )
  }

  /**
   * Verifica si el usuario sigue autenticado según el token en localStorage.
   * Si el token es válido y no hay perfil en memoria, consulta `/api/auth/me`
   * y actualiza el estado global. Devuelve `true` si el token es válido.
   */
  verifyLoggedIn(): boolean {
    const token = this.storage.getItem('jwtToken');
    const expiration = this.storage.getItem('expiration');

    if (!token || !expiration) {
      this.clearLocalStorage();
      return false;
    }

    const isValid = this.isTokenValid(expiration);
    if (!isValid) {
      this.clearLocalStorage();
      return false;
    }

    if (this.appState.getUserProfile() === undefined) {
      this.fetchMeProfile().subscribe({
        next: (profile) => {

          console.log("Fetched user profile, " + JSON.stringify(profile));

          this.appState.updateUserProfile(profile);
          this.appState.updateIsLoggedIn(true);
        },
        error: (_err) => {
          // Si falla el endpoint, se hace logout para evitar estado inconsistente
          this.clearLocalStorage();
        }
      });
    } else {
      this.appState.updateIsLoggedIn(true);
    }

    return true;
  }

  /**
   * Llama al endpoint `/api/auth/me` que retorna el perfil del usuario autenticado.
   */
  private fetchMeProfile(): Observable<LoginProfileResponse> {
    return this.http.get<LoginProfileResponse>(`${this.apiPath}/api/auth/me`);
    }

  /**
   * Valida si la fecha de expiración es posterior a `now`.
   */
  private isTokenValid(expirationIso: string): boolean {
    const now = new Date();
    const exp = new Date(expirationIso);
    if (isNaN(exp.valueOf())) return false;
    return exp.getTime() > now.getTime();
  }

  private clearLocalStorage() {
    this.storage.removeItem('jwtToken');
    this.storage.removeItem('loggedIn');
    this.storage.removeItem('expiration');

    this.appState.logout();
  }

  logout() {
    this.clearLocalStorage();

    this.route.navigate(['/login']);
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

  private saveToken(auth: AuthResponse) {
    this.storage.setItem('jwtToken', auth.jwtToken);
    this.storage.setItem('loggedIn', '1');
    this.storage.setItem('expiration', auth.expiracion)
  }
}
