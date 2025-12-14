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
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-expense-form',
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
    MatSelectModule,
  ],
  templateUrl: './expense-form.html',
  styleUrl: './expense-form.scss',
})
export class ExpenseFormComponent implements OnInit {
  expenseForm!: FormGroup;

  // 경비 카테고리 옵션
  expenseCategories = [
    { value: 'transport', viewValue: '교통비' },
    { value: 'meal', viewValue: '식사/접대비' },
    { value: 'office', viewValue: '사무용품비' },
    { value: 'other', viewValue: '기타' },
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // 폼 그룹 초기화: 발생일, 카테고리, 금액, 사유는 필수 입력
    this.expenseForm = this.fb.group({
      expenseDate: ['', Validators.required],
      category: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(1)]],
      description: ['', Validators.required],
      receiptFile: [''], // 파일 첨부 (실제 파일 객체 대신 파일 이름을 저장할 목업 필드)
    });
  }

  // ⭐️ Mock 파일 업로드 처리 로직 ⭐️
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      // 실제 파일 업로드 로직은 백엔드 연동 시 구현
      // 여기서는 폼 필드에 파일 이름을 임시로 저장합니다.
      this.expenseForm.get('receiptFile')?.setValue(file.name);
      console.log('File selected:', file.name);
    }
  }

  onSubmit(): void {
    if (this.expenseForm.valid) {
      console.log('경비 신청 데이터:', this.expenseForm.value);
      alert('경비 신청이 접수되었습니다. (Mock)');
      this.expenseForm.reset();
    } else {
      alert('필수 입력 항목을 모두 채워주세요.');
    }
  }
}
