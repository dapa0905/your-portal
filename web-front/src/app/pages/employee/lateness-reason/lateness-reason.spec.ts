import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatenessReason } from './lateness-reason';

describe('LatenessReason', () => {
  let component: LatenessReason;
  let fixture: ComponentFixture<LatenessReason>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LatenessReason]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LatenessReason);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
