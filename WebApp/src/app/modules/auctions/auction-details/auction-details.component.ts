import { Component, OnDestroy, OnInit } from '@angular/core';
import { firstValueFrom, Subject, takeUntil } from 'rxjs';
import { Auction } from '@licirom/modules/auctions/auction.model';
import { ActivatedRoute, Router } from '@angular/router';
import { IdentityService } from '@licirom/core/identity/identity.service';
import { AuctionService } from '@licirom/modules/auctions/auction.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-auction-details',
  templateUrl: './auction-details.component.html',
  styleUrls: ['./auction-details.component.scss']
})
export class AuctionDetailsComponent implements OnInit, OnDestroy {
  auction?: Auction;
  ownsCurrentAuction = false;

  deleting = false;

  private readonly _unsubscribeAll = new Subject<void>();

  /**
   * AuctionDetailsComponent constructor method.
   *
   * @param _activatedRoute
   * @param _identityService
   * @param _auctionService
   * @param _toastService
   * @param _router
   */
  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _identityService: IdentityService,
    private readonly _auctionService: AuctionService,
    private readonly _toastService: MatSnackBar,
    private readonly _router: Router,
  ) {
  }

  /** @inheritDoc */
  ngOnInit(): void {
    // Load auction data
    this._activatedRoute.data.pipe(
      takeUntil(this._unsubscribeAll)
    ).subscribe(async data => {
      if ('auction' in data) {
        this.auction = data['auction'];

        // Determine ownership
        const identity = await firstValueFrom(this._identityService.currentIdentity$);
        this.ownsCurrentAuction = identity?.key === this.auction?.creatorKey;
      }
    });
  }

  /** @inheritDoc **/
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  /**
   * Delete the current auction.
   */
  deleteAuction(): void {
    // Make sure an auction exists
    if (!this.auction) {
      throw new Error('No auction provided.');
    }

    // Make sure the auction is not already being deleted
    if (this.deleting) {
      throw new Error('Already deleting an auction.');
    }

    // Set the deleting flag
    this.deleting = true;

    // Send the request to the API
    this._auctionService.deleteByKey(this.auction.key).subscribe({
      next: async () => {
        await this._router.navigate(['/auctions']);
        this._toastService.open('Auction deleted successfully', 'Close');
      },
      error: () => {
        this._toastService.open('An error has occurred. Please try again!', 'Close');
        this.deleting = false;
      }
    });
  }
}
