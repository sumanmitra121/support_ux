import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OmdashboardComponent } from './omdashboard.component';

describe('OmdashboardComponent', () => {
  let component: OmdashboardComponent;
  let fixture: ComponentFixture<OmdashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OmdashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OmdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
