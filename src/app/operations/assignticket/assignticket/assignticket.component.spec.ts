import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignticketComponent } from './assignticket.component';

describe('AssignticketComponent', () => {
  let component: AssignticketComponent;
  let fixture: ComponentFixture<AssignticketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignticketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignticketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
