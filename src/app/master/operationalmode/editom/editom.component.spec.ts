import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditomComponent } from './editom.component';

describe('EditomComponent', () => {
  let component: EditomComponent;
  let fixture: ComponentFixture<EditomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
