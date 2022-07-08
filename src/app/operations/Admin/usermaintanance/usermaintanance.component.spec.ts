import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsermaintananceComponent } from './usermaintanance.component';

describe('UsermaintananceComponent', () => {
  let component: UsermaintananceComponent;
  let fixture: ComponentFixture<UsermaintananceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsermaintananceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsermaintananceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
