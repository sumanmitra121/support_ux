import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddtsComponent } from './addts.component';

describe('AddtsComponent', () => {
  let component: AddtsComponent;
  let fixture: ComponentFixture<AddtsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddtsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddtsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
