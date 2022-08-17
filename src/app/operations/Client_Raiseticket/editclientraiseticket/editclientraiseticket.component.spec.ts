import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditclientraiseticketComponent } from './editclientraiseticket.component';

describe('EditclientraiseticketComponent', () => {
  let component: EditclientraiseticketComponent;
  let fixture: ComponentFixture<EditclientraiseticketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditclientraiseticketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditclientraiseticketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
