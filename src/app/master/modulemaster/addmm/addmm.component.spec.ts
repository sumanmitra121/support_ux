import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddmmComponent } from './addmm.component';

describe('AddmmComponent', () => {
  let component: AddmmComponent;
  let fixture: ComponentFixture<AddmmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddmmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddmmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
