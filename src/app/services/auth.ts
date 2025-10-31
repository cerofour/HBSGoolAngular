import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { LoginResponse } from './auth/login-response';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private apiPath = "http://152.67.46.79:8080";

  login(email: string, password: string): Observable<LoginResponse> {

    return this.http
      .post<LoginResponse>(`${this.apiPath}/api/auth/login`, {username: email, password})
      .pipe(
        tap(res => this.saveToken(res.token))
      )
  }

  private saveToken(token: string) {
    localStorage.setItem('jwtToken', token);
  }
}
