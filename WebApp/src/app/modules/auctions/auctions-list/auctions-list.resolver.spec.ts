import { TestBed } from '@angular/core/testing';
import { AuctionsListResolver } from '@licirom/modules/auctions/auctions-list/auctions-list.resolver';

describe('AuctionsListResolver', () => {
  let resolver: AuctionsListResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(AuctionsListResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
