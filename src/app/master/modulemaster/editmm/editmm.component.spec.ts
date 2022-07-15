import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditmmComponent } from './editmm.component';

describe('EditmmComponent', () => {
  let component: EditmmComponent;
  let fixture: ComponentFixture<EditmmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditmmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditmmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
