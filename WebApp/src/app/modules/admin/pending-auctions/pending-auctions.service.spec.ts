import { TestBed } from '@angular/core/testing';
import { PendingAuctionsService } from '@licirom/modules/admin/pending-auctions/pending-auctions.service';

describe('PendingAuctionsService', () => {
  let service: PendingAuctionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PendingAuctionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
