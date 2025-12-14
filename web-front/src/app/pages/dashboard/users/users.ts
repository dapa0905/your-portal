import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Inactive';
}

const MOCK_USERS: User[] = [
  { id: 1, name: '홍길동', email: 'hong@test.com', role: 'ADMIN', status: 'Active' },
  { id: 2, name: '김철수', email: 'kim@test.com', role: 'USER', status: 'Active' },
  { id: 3, name: '이영희', email: 'lee@test.com', role: 'USER', status: 'Inactive' },
  { id: 4, name: '관리자', email: 'admin@test.com', role: 'ADMIN', status: 'Active' },
];

@Component({
  selector: 'app-users',
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './users.html',
  styleUrl: './users.scss',
})
export class UsersComponet {
  displayedColumns: string[] = ['id', 'name', 'email', 'role', 'status', 'actions'];
  dataSource: MatTableDataSource<User>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    this.dataSource = new MatTableDataSource(MOCK_USERS);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
