import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  AuctionBidCreateComponent
} from '@licirom/modules/auctions/auction-details/auction-bids/auction-bid-create/auction-bid-create.component';

describe('AuctionBidCreateComponent', () => {
  let component: AuctionBidCreateComponent;
  let fixture: ComponentFixture<AuctionBidCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuctionBidCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuctionBidCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
