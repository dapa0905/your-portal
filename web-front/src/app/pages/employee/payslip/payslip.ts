import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

export interface Payslip {
  id: number;
  paymentDate: string;
  payPeriod: string;
  grossPay: number;
  netPay: number;
  status: string;
}

const MOCK_DATA: Payslip[] = [
  {
    id: 1,
    paymentDate: '2025-11-25',
    payPeriod: '2025년 11월',
    grossPay: 4500000,
    netPay: 3800000,
    status: 'Completed',
  },
  {
    id: 2,
    paymentDate: '2025-10-25',
    payPeriod: '2025년 10월',
    grossPay: 4500000,
    netPay: 3800000,
    status: 'Completed',
  },
  {
    id: 3,
    paymentDate: '2025-09-25',
    payPeriod: '2025년 09월',
    grossPay: 4500000,
    netPay: 3800000,
    status: 'Completed',
  },
  {
    id: 4,
    paymentDate: '2025-08-25',
    payPeriod: '2025년 08월',
    grossPay: 4500000,
    netPay: 3800000,
    status: 'Completed',
  },
];

@Component({
  selector: 'app-payslip',
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
  ],
  templateUrl: './payslip.html',
  styleUrl: './payslip.scss',
})
export class PayslipComponent {
  // MatTable에 표시할 컬럼 목록
  displayedColumns: string[] = [
    'payPeriod',
    'paymentDate',
    'grossPay',
    'netPay',
    'status',
    'actions',
  ];
  dataSource = MOCK_DATA;

  // 필터링을 위한 목업 데이터
  availableYears: number[] = [2025, 2024];
  selectedYear: number = 2025; // 기본 선택 연도

  constructor() {}

  ngOnInit(): void {
    // 컴포넌트 초기화 시 수행할 로직
  }

  /** 금액을 한국 통화 형식 (3자리 콤마)으로 변환합니다. */
  formatCurrency(value: number): string {
    return value.toLocaleString('ko-KR');
  }

  /** 명세서 보기/다운로드 버튼 클릭 시 액션 (Mock) */
  onViewPayslip(payslip: Payslip): void {
    alert(`[${payslip.payPeriod}] 월급 명세서를 다운로드/열람합니다. (PDF Mock)`);
    console.log('Viewing payslip:', payslip);
  }

  /** 연도 변경 시 데이터 필터링 (Mock) */
  onYearChange(year: number): void {
    this.selectedYear = year;
    // TODO: 백엔드 연동 시 여기에 해당 년도의 데이터를 다시 불러오는 API 호출 로직 추가
    console.log(`Filtering payslips for year: ${year}`);
  }
}
