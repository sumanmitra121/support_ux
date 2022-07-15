import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdittktComponent } from './edittkt.component';

describe('EdittktComponent', () => {
  let component: EdittktComponent;
  let fixture: ComponentFixture<EdittktComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdittktComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EdittktComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
