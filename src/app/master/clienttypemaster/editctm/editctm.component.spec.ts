import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditctmComponent } from './editctm.component';

describe('EditctmComponent', () => {
  let component: EditctmComponent;
  let fixture: ComponentFixture<EditctmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditctmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditctmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
