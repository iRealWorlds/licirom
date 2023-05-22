import { TestBed } from '@angular/core/testing';
import { PendingAuctionsResolver } from '@licirom/modules/admin/pending-auctions.resolver';

describe('PendingAuctionsResolver', () => {
  let resolver: PendingAuctionsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(PendingAuctionsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
