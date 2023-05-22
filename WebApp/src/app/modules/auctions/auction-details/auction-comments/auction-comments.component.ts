import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Auction } from '@licirom/modules/auctions/auction.model';
import { AuctionComment } from '@licirom/modules/auctions/auction-details/auction-comments/auction-comment.model';
import {
  AuctionCommentService
} from '@licirom/modules/auctions/auction-details/auction-comments/auction-comment.service';
import { firstValueFrom } from 'rxjs';
import { comment } from 'postcss';

@Component({
  selector: 'app-auction-comments',
  templateUrl: './auction-comments.component.html',
  styleUrls: ['./auction-comments.component.scss']
})
export class AuctionCommentsComponent implements AfterViewInit {
  @Input() auction?: Auction;
  @ViewChild('commentsWrapper') commentsWrapper?: ElementRef<HTMLElement>;

  comments?: AuctionComment[];

  /**
   * AuctionCommentsComponent constructor method.
   *
   * @param _commentService
   */
  constructor(
    private readonly _commentService: AuctionCommentService
  ) {
  }

  /** @inheritDoc */
  ngAfterViewInit(): void {
    this.fetchComments().then(() => {
      if (this.commentsWrapper?.nativeElement) {
        this.commentsWrapper.nativeElement.scrollTop = this.commentsWrapper.nativeElement.scrollHeight;
      }
    });
  }


  /**
   * Fetch the comments for this auction from the APi.
   */
  async fetchComments(): Promise<AuctionComment[]> {
    if (!this.auction) {
      throw new Error('No auction provided');
    }

    this.comments = await firstValueFrom(this._commentService.getAll(this.auction.key));

    return this.comments;
  }

  protected readonly comment = comment;
}
