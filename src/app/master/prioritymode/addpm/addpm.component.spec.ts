import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddpmComponent } from './addpm.component';

describe('AddpmComponent', () => {
  let component: AddpmComponent;
  let fixture: ComponentFixture<AddpmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddpmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddpmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
