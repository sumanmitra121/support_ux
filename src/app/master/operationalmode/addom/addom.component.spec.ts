import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddomComponent } from './addom.component';

describe('AddomComponent', () => {
  let component: AddomComponent;
  let fixture: ComponentFixture<AddomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
