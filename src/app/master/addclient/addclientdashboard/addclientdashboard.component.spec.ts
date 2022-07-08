import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddclientdashboardComponent } from './addclientdashboard.component';

describe('AddclientdashboardComponent', () => {
  let component: AddclientdashboardComponent;
  let fixture: ComponentFixture<AddclientdashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddclientdashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddclientdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
