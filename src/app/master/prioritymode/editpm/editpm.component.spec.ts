import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditpmComponent } from './editpm.component';

describe('EditpmComponent', () => {
  let component: EditpmComponent;
  let fixture: ComponentFixture<EditpmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditpmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditpmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
