import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientraisetktComponent } from './clientraisetkt.component';

describe('ClientraisetktComponent', () => {
  let component: ClientraisetktComponent;
  let fixture: ComponentFixture<ClientraisetktComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientraisetktComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientraisetktComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
