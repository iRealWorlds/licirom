import { TestBed } from '@angular/core/testing';

import { AuctionCategoriesService } from '@licirom/modules/admin/auction-categories/auction-categories.service';

describe('AuctionCategoriesService', () => {
  let service: AuctionCategoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuctionCategoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
