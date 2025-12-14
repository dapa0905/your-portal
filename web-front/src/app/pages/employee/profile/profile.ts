import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-profile',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDividerModule,
  ],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      employeeId: [{ value: 1001, disabled: true }],
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{3}-[0-9]{3,4}-[0-9]{4}$')]],
      address: [''],
    });

    this.profileForm.patchValue({
      name: '홍길동',
      email: 'hong@example.com',
      phone: '010-1234-5678',
      address: '서울시 강남구',
    });
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      console.log('수정된 프로필 데이터:', this.profileForm.getRawValue());
      alert('개인 정보가 성공적으로 수정되었습니다. (Mock)');
    } else {
      alert('폼이 유효하지 않습니다. 입력 값을 확인해주세요.');
    }
  }
}
