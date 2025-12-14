import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-lateness-reason',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
  ],
  templateUrl: './lateness-reason.html',
  styleUrl: './lateness-reason.scss',
})
export class LatenessReasonComponent implements OnInit {
  latenessForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // 폼 그룹 초기화: 지각 일자, 시간, 사유는 필수 입력
    this.latenessForm = this.fb.group({
      latenessDate: ['', Validators.required],
      latenessTime: ['', Validators.required], // 지각 시간 (HH:MM)
      reason: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.latenessForm.valid) {
      console.log('지각 사유 데이터:', this.latenessForm.value);
      alert('지각 사유가 성공적으로 제출되었습니다. (Mock)');
      this.latenessForm.reset();
    } else {
      alert('필수 입력 항목을 모두 채워주세요.');
    }
  }
}
