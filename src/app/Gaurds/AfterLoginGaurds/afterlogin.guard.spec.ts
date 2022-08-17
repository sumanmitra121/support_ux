import { TestBed } from '@angular/core/testing';

import { AfterloginGuard } from './afterlogin.guard';

describe('AfterloginGuard', () => {
  let guard: AfterloginGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AfterloginGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
