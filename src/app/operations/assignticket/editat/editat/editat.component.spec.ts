import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditatComponent } from './editat.component';

describe('EditatComponent', () => {
  let component: EditatComponent;
  let fixture: ComponentFixture<EditatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
