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
  selector: 'app-schedule-form',
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
  templateUrl: './schedule-form.html',
  styleUrl: './schedule-form.scss',
})
export class ScheduleFormComponent implements OnInit {
  scheduleForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // 폼 그룹 초기화: 근무 일자, 시작/종료 시간은 필수 입력
    this.scheduleForm = this.fb.group({
      workDate: ['', Validators.required],
      startTime: ['', Validators.required], // HH:MM 형태의 문자열로 입력
      endTime: ['', Validators.required], // HH:MM 형태의 문자열로 입력
      memo: [''], // 근무 내용이나 특이사항 메모
    });
  }

  onSubmit(): void {
    if (this.scheduleForm.valid) {
      console.log('근무표 데이터:', this.scheduleForm.value);
      alert('근무표 신청이 접수되었습니다. (Mock)');
      this.scheduleForm.reset();
    } else {
      alert('필수 입력 항목을 모두 채워주세요.');
    }
  }
}
