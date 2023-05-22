import { TestBed } from '@angular/core/testing';
import { AuctionCategoryService } from '@licirom/modules/auctions/auction-category.service';

describe('AuctionCategoryService', () => {
  let service: AuctionCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuctionCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
