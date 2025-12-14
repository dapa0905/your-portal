import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// ⭐️ Material Modules ⭐️
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms'; // ngModel 사용을 위해 추가

// 모든 신청서 유형을 아우르는 인터페이스
export interface Application {
  id: number;
  type: 'Leave' | 'Expense' | 'Schedule' | 'Lateness'; // 유형
  typeKr: string; // 한글 유형
  title: string; // 제목/내용 요약
  requestDate: string; // 신청일
  status: 'Pending' | 'Approved' | 'Rejected'; // 상태
}

// Mock 데이터
const MOCK_APPLICATIONS: Application[] = [
  {
    id: 101,
    type: 'Leave',
    typeKr: '휴가',
    title: '연차 휴가 신청 (2025/12/20)',
    requestDate: '2025-12-10',
    status: 'Pending',
  },
  {
    id: 205,
    type: 'Expense',
    typeKr: '경비',
    title: '교통비 신청 (11월)',
    requestDate: '2025-12-05',
    status: 'Approved',
  },
  {
    id: 310,
    type: 'Schedule',
    typeKr: '근무',
    title: '근무표 수정 요청 (12/01)',
    requestDate: '2025-12-03',
    status: 'Approved',
  },
  {
    id: 401,
    type: 'Lateness',
    typeKr: '지각',
    title: '지각 사유서 (12/15 09:15)',
    requestDate: '2025-12-16',
    status: 'Rejected',
  },
  {
    id: 201,
    type: 'Expense',
    typeKr: '경비',
    title: '식사/접대비',
    requestDate: '2025-11-28',
    status: 'Pending',
  },
  {
    id: 105,
    type: 'Leave',
    typeKr: '휴가',
    title: '병가 신청 (3일)',
    requestDate: '2025-11-10',
    status: 'Approved',
  },
];

@Component({
  selector: 'app-application-status',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
  ],
  templateUrl: './application-status.html',
  styleUrls: ['./application-status.scss'],
})
export class ApplicationStatusComponent implements OnInit {
  displayedColumns: string[] = ['id', 'typeKr', 'title', 'requestDate', 'status', 'actions'];

  // 전체 데이터
  allApplications: Application[] = MOCK_APPLICATIONS;
  // 필터링된 데이터 (테이블에 표시될 데이터)
  dataSource: Application[] = [];

  // 필터링 옵션
  applicationTypes = [
    { value: 'ALL', viewValue: '전체 신청서' },
    { value: 'Leave', viewValue: '휴가 신청' },
    { value: 'Expense', viewValue: '경비 처리' },
    { value: 'Schedule', viewValue: '근무표 작성' },
    { value: 'Lateness', viewValue: '지각 사유서' },
  ];
  selectedType: string = 'ALL';

  constructor() {}

  ngOnInit(): void {
    // 초기 로드 시 전체 데이터를 표시
    this.dataSource = this.allApplications;
  }

  /** 신청 유형 변경 시 데이터 필터링 */
  onFilterChange(type: string): void {
    this.selectedType = type;
    if (type === 'ALL') {
      this.dataSource = this.allApplications;
    } else {
      this.dataSource = this.allApplications.filter((app) => app.type === type);
    }
  }

  /** 상세 보기 버튼 클릭 액션 (Mock) */
  onViewDetails(application: Application): void {
    alert(`[${application.typeKr} - ID: ${application.id}] 상세 내용을 확인합니다. (팝업 Mock)`);
    // 실제 구현 시 MatDialog를 사용하거나 상세 페이지로 라우팅
    console.log('Viewing details for:', application);
  }
}
