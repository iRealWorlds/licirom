import { TestBed } from '@angular/core/testing';
import { BidService } from '@licirom/modules/auctions/auction-details/auction-bids/bid.service';

describe('BidService', () => {
  let service: BidService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BidService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
