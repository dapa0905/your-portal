import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-overview',
  imports: [CommonModule, MatCardModule],
  templateUrl: './overview.html',
  styleUrl: './overview.scss',
})
export class OverviewComponent {}
