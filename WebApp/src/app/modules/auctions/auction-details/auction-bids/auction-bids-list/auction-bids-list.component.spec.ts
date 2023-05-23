import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  AuctionBidsListComponent
} from '@licirom/modules/auctions/auction-details/auction-bids/auction-bids-list/auction-bids-list.component';

describe('AuctionBidsListComponent', () => {
  let component: AuctionBidsListComponent;
  let fixture: ComponentFixture<AuctionBidsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuctionBidsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuctionBidsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
