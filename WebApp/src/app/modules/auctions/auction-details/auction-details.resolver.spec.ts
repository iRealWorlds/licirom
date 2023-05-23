import { TestBed } from '@angular/core/testing';
import { AuctionDetailsResolver } from '@licirom/modules/auctions/auction-details/auction-details.resolver';

describe('AuctionDetailsResolver', () => {
  let resolver: AuctionDetailsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(AuctionDetailsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
