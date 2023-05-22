import { Component, OnInit, OnDestroy} from '@angular/core';
import { IdentityUser } from '@licirom/core/identity/identity-user.model';
import { Observable, Subject , takeUntil} from 'rxjs';
import { IdentityService } from '@licirom/core/identity/identity.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy{
  identity$?: Observable<IdentityUser | null | undefined>;

  private readonly _unsubscribeAll = new Subject<void>();
  
  /**
   * HomePageComponent constructor method.
   *
   * @param _identityService
   */
  constructor(
    private readonly _identityService: IdentityService
  ) {
  }
  
  /**
   * @inheritdoc
   */
  ngOnInit(): void {
    this.identity$ = this._identityService.currentIdentity$.pipe(
      takeUntil(this._unsubscribeAll)
    );
  }

   /**
   * @inheritdoc
   */
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  

}
