import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditnotifyComponent } from './editnotify.component';

describe('EditnotifyComponent', () => {
  let component: EditnotifyComponent;
  let fixture: ComponentFixture<EditnotifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditnotifyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditnotifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
