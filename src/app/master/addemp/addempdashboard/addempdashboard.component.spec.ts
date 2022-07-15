import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddempdashboardComponent } from './addempdashboard.component';

describe('AddempdashboardComponent', () => {
  let component: AddempdashboardComponent;
  let fixture: ComponentFixture<AddempdashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddempdashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddempdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
