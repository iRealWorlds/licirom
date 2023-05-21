import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  AuctionCommentCreateComponent
} from '@licirom/modules/auctions/auction-details/auction-comments/auction-comment-create/auction-comment-create.component';


describe('AuctionCommentCreateComponent', () => {
  let component: AuctionCommentCreateComponent;
  let fixture: ComponentFixture<AuctionCommentCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuctionCommentCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuctionCommentCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
