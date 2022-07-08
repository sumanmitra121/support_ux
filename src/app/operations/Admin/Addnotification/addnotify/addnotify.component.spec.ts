import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnotifyComponent } from './addnotify.component';

describe('AddnotifyComponent', () => {
  let component: AddnotifyComponent;
  let fixture: ComponentFixture<AddnotifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddnotifyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddnotifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
