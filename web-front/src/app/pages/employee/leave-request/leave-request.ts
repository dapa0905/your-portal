import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-leave-request',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
  ],
  templateUrl: './leave-request.html',
  styleUrl: './leave-request.scss',
})
export class LeaveRequestComponent {
  leaveForm!: FormGroup;

  leaveTypes = [
    { value: 'annual', viewValue: '연차 휴가 (Annual Leave)' },
    { value: 'sick', viewValue: '병가 (Sick Leave)' },
    { value: 'maternity', viewValue: '출산 휴가 (Maternity Leave)' },
    { value: 'other', viewValue: '기타 휴가 (Other)' },
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.leaveForm = this.fb.group({
      leaveType: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      reason: ['', Validators.required],
      comments: [''],
    });
  }

  onSubmit(): void {
    if (this.leaveForm.valid) {
      console.log('휴가 신청 데이터:', this.leaveForm.value);
      alert('휴가 신청이 접수되었습니다. (Mock)');
      this.leaveForm.reset();
    } else {
      alert('필수 입력 항목을 모두 채워주세요.');
    }
  }
}
