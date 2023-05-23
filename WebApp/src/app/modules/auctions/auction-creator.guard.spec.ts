import { TestBed } from '@angular/core/testing';
import { AuctionCreatorGuard } from '@licirom/modules/auctions/auction-creator.guard';

describe('AuctionCreatorGuard', () => {
  let guard: AuctionCreatorGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuctionCreatorGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
