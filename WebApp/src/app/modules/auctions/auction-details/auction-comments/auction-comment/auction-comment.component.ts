import { Component, Input } from '@angular/core';
import { AuctionComment } from '@licirom/modules/auctions/auction-details/auction-comments/auction-comment.model';

@Component({
  selector: 'app-auction-comment',
  templateUrl: './auction-comment.component.html',
  styleUrls: ['./auction-comment.component.scss']
})
export class AuctionCommentComponent {
  @Input() comment?: AuctionComment;

}
