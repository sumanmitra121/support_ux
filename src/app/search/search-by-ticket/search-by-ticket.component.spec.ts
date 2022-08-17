import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchByTicketComponent } from './search-by-ticket.component';

describe('SearchByTicketComponent', () => {
  let component: SearchByTicketComponent;
  let fixture: ComponentFixture<SearchByTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchByTicketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchByTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
