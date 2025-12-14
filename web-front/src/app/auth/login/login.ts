import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../auth.service';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { TokenStorageService } from '../token-storage.service';
import { MatFormFieldModule } from '@angular/material/form-field';

import { LoginRequest, JwtResponse } from '../login';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    CommonModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class LoginComponent implements OnInit {
  form: LoginRequest = {
    email: 'admin@hrms.com',
    password: '1234',
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
  }

  onSubmit(): void {
    this.authService.login(this.form).subscribe({
      next: (data: JwtResponse) => {
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;

        window.location.reload();
      },
      error: (err: HttpErrorResponse) => {
        console.error('Login Error Response:', err);

        let message = '로그인 중 알 수 없는 오류가 발생했습니다.';

        if (err.error instanceof ErrorEvent) {
          // 클라이언트 측 네트워크 오류
          message = `클라이언트 오류: ${err.error.message}`;
        } else if (err.status === 403) {
          // 403 Forbidden: Spring Security 설정 오류 또는 CSRF 문제 (백엔드 수정 필요!)
          message = '로그인 권한이 없습니다. (서버 접근 설정 오류)';
        } else if (err.error && err.error.message) {
          // 서버에서 JSON 형태의 메시지를 보낸 경우
          message = err.error.message;
        } else if (err.message) {
          // 기타 HttpErrorResponse 메시지
          message = `서버 오류: ${err.message}`;
        }

        this.errorMessage = message;
      },
    });
  }
}
