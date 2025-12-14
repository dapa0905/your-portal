import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './auth/auth.guard';

import { OverviewComponent } from './pages/dashboard/overview/overview';
import { SettingsComponent } from './pages/dashboard/settings/settings';
import { UsersComponet } from './pages/dashboard/users/users';

import { EmployeeComponent } from './pages/employee/employee.component';
import { ProfileComponent } from './pages/employee/profile/profile';
import { LeaveRequestComponent } from './pages/employee/leave-request/leave-request';
import { PayslipComponent } from './pages/employee/payslip/payslip';
import { ExpenseFormComponent } from './pages/employee/expense-form/expense-form';
import { ScheduleFormComponent } from './pages/employee/schedule-form/schedule-form';
import { LatenessReasonComponent } from './pages/employee/lateness-reason/lateness-reason';
import { ApplicationStatusComponent } from './pages/employee/application-status/application-status';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'overview', component: OverviewComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'users', component: UsersComponet },
      {
        path: 'employee',
        component: EmployeeComponent,
        children: [
          { path: '', redirectTo: 'profile', pathMatch: 'full' },
          { path: 'profile', component: ProfileComponent },
          { path: 'leave-request', component: LeaveRequestComponent },
          { path: 'payslip', component: PayslipComponent },
          { path: 'expense-form', component: ExpenseFormComponent },
          { path: 'schedule-form', component: ScheduleFormComponent },
          { path: 'lateness-reason', component: LatenessReasonComponent },
          { path: 'application-status', component: ApplicationStatusComponent },
        ],
      },
    ],
  },

  { path: '**', redirectTo: 'dashboard' },
];
