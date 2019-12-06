import { TestBed } from '@angular/core/testing';

import { FamilydetailsService } from './familydetails.service';

describe('FamilydetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FamilydetailsService = TestBed.get(FamilydetailsService);
    expect(service).toBeTruthy();
  });
});
