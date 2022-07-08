import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddeComponent } from './adde.component';

describe('AddeComponent', () => {
  let component: AddeComponent;
  let fixture: ComponentFixture<AddeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
