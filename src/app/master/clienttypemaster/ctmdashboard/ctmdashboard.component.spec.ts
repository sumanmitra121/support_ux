import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtmdashboardComponent } from './ctmdashboard.component';

describe('CtmdashboardComponent', () => {
  let component: CtmdashboardComponent;
  let fixture: ComponentFixture<CtmdashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CtmdashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CtmdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
