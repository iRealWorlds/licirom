import { AfterViewInit, Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { Auction } from '@licirom/modules/auctions/auction.model';
import { AuctionComment } from '@licirom/modules/auctions/auction-details/auction-comments/auction-comment.model';
import {
  AuctionCommentService
} from '@licirom/modules/auctions/auction-details/auction-comments/auction-comment.service';
import { firstValueFrom } from 'rxjs';
import Pusher, { Channel } from 'pusher-js';
import { EnvironmentConfig } from '@licirom/core/environment/environment-config.model';

@Component({
  selector: 'app-auction-comments',
  templateUrl: './auction-comments.component.html',
  styleUrls: ['./auction-comments.component.scss']
})
export class AuctionCommentsComponent implements AfterViewInit, OnChanges {
  @Input() auction?: Auction;
  @ViewChild('commentsWrapper') commentsWrapper?: ElementRef<HTMLElement>;

  comments?: AuctionComment[];

  updateChannel?: Channel;

  private readonly _pusher: Pusher;

  /**
   * AuctionCommentsComponent constructor method.
   *
   * @param _commentService
   * @param environment
   */
  constructor(
    private readonly _commentService: AuctionCommentService,
    environment: EnvironmentConfig
  ) {
    this._pusher = new Pusher(environment.pusher.appKey, {
      cluster: environment.pusher.cluster,
    });
  }

  /** @inheritDoc */
  ngOnChanges(changes: SimpleChanges): void {
    if ('auction' in changes) {
      if (this.auction) {
        this.updateChannel?.unsubscribe();
        this.updateChannel = this._pusher.subscribe(`auctions.${this.auction.key}`);
        this.updateChannel.bind('comments.created', () => {
          this._fetchComments().then(() => {
            // Do nothing
          });
        });
      }
    }
  }

  /** @inheritDoc */
  ngAfterViewInit(): void {
    this._fetchComments().then(() => {
      if (this.commentsWrapper?.nativeElement) {
        this.commentsWrapper.nativeElement.scrollTop = this.commentsWrapper.nativeElement.scrollHeight;
      }
    });
  }

  /**
   * Fetch the comments for this auction from the APi.
   */
  private async _fetchComments(): Promise<AuctionComment[]> {
    if (!this.auction) {
      throw new Error('No auction provided');
    }

    this.comments = await firstValueFrom(this._commentService.getAll(this.auction.key));

    return this.comments;
  }
}
