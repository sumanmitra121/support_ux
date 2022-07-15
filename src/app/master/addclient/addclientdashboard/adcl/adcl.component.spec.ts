import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdclComponent } from './adcl.component';

describe('AdclComponent', () => {
  let component: AdclComponent;
  let fixture: ComponentFixture<AdclComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdclComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdclComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
