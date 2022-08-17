import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddclienttypeComponent } from './addclienttype.component';

describe('AddclienttypeComponent', () => {
  let component: AddclienttypeComponent;
  let fixture: ComponentFixture<AddclienttypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddclienttypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddclienttypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
