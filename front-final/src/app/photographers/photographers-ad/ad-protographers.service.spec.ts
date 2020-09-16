import { TestBed } from '@angular/core/testing';

import { AdProtographersService } from './ad-protographers.service';

describe('AdProtographersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdProtographersService = TestBed.get(AdProtographersService);
    expect(service).toBeTruthy();
  });
});
