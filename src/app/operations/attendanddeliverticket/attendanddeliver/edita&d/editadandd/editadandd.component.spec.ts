import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditadanddComponent } from './editadandd.component';

describe('EditadanddComponent', () => {
  let component: EditadanddComponent;
  let fixture: ComponentFixture<EditadanddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditadanddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditadanddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
