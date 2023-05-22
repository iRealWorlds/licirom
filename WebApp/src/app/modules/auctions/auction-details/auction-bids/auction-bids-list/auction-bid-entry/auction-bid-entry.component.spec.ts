import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  AuctionBidEntryComponent
} from '@licirom/modules/auctions/auction-details/auction-bids/auction-bids-list/auction-bid-entry/auction-bid-entry.component';

describe('AuctionBidEntryComponent', () => {
  let component: AuctionBidEntryComponent;
  let fixture: ComponentFixture<AuctionBidEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuctionBidEntryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuctionBidEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
