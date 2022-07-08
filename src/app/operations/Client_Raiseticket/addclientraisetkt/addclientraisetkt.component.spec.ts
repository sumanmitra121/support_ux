import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddclientraisetktComponent } from './addclientraisetkt.component';

describe('AddclientraisetktComponent', () => {
  let component: AddclientraisetktComponent;
  let fixture: ComponentFixture<AddclientraisetktComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddclientraisetktComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddclientraisetktComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
