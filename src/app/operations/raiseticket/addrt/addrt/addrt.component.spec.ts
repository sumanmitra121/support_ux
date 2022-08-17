import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddrtComponent } from './addrt.component';

describe('AddrtComponent', () => {
  let component: AddrtComponent;
  let fixture: ComponentFixture<AddrtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddrtComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddrtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
