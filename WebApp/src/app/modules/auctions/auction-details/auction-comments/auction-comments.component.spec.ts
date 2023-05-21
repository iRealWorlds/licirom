import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  AuctionCommentsComponent
} from '@licirom/modules/auctions/auction-details/auction-comments/auction-comments.component';


describe('AuctionCommentsComponent', () => {
  let component: AuctionCommentsComponent;
  let fixture: ComponentFixture<AuctionCommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuctionCommentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuctionCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
