import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginRequest, JwtResponse } from './login';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUrl = 'http://localhost:8080/api/auth/';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {}

  /**
   * 로그인 요청을 백엔드에 전송합니다.
   * @param credentials LoginRequest 객체 (email, password)
   * @returns JWTResponse를 포함하는 Observable
   */
  login(credentials: LoginRequest): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(
      this.authUrl + 'login', // 백엔드 @PostMapping("/login") 매핑
      credentials,
      this.httpOptions
    );
  }

  /**
   * 로그아웃 요청
   * @param void
   * @returns void
   */
  logout(): void {
    this.tokenStorage.signOut();
  }

  isLoggedIn(): boolean {
    return !!this.tokenStorage.getToken();
  }

  getUserRole(): string {
    const user = this.tokenStorage.getUser();
    return user.role || '';
  }
}
