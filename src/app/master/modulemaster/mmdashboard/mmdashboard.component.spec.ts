import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MmdashboardComponent } from './mmdashboard.component';

describe('MmdashboardComponent', () => {
  let component: MmdashboardComponent;
  let fixture: ComponentFixture<MmdashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MmdashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MmdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
