import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanddeliverComponent } from './attendanddeliver.component';

describe('AttendanddeliverComponent', () => {
  let component: AttendanddeliverComponent;
  let fixture: ComponentFixture<AttendanddeliverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendanddeliverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanddeliverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
