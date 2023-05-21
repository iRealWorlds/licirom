import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  AuctionCommentComponent
} from '@licirom/modules/auctions/auction-details/auction-comments/auction-comment/auction-comment.component';


describe('AuctionCommentComponent', () => {
  let component: AuctionCommentComponent;
  let fixture: ComponentFixture<AuctionCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuctionCommentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuctionCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
