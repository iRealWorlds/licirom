import { TestBed } from '@angular/core/testing';
import {
  AuctionCommentService
} from '@licirom/modules/auctions/auction-details/auction-comments/auction-comment.service';


describe('AuctionCommentService', () => {
  let service: AuctionCommentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuctionCommentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
