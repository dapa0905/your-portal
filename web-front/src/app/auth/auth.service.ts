import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = false;
  private readonly MOCK_TOKEN = 'mock-jwt-token-12345';

  constructor(private router: Router) {
    this.loggedIn = !!localStorage.getItem('auth_token');
  }

  login(email: string, password: string): Observable<any> {
    return of({ token: this.MOCK_TOKEN, email: email, role: 'GOVERNMENT' }).pipe(
      tap((response) => {
        localStorage.setItem('auth_token', response.token);
        this.loggedIn = true;
      })
    );
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    this.loggedIn = false;
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }
}
