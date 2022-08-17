import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdittsComponent } from './editts.component';

describe('EdittsComponent', () => {
  let component: EdittsComponent;
  let fixture: ComponentFixture<EdittsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdittsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EdittsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
