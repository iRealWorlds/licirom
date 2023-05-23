import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuctionCategoryModel } from '@licirom/modules/admin/auction-categories/auction-category.model';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit, OnDestroy{
  private readonly _unsubscribeAll = new Subject<void>();
  categories?: AuctionCategoryModel[];
/**
 * 
 */
  constructor(
    private readonly _activatedRoute: ActivatedRoute
  ) {
  }

  /** @inheritDoc **/
  ngOnInit(): void {
    this._activatedRoute.data.pipe(
      takeUntil(this._unsubscribeAll)
    ).subscribe(data => {
      if('categories' in data){
        this.categories = data['categories'].items;
      }
    });
  }
  
  /** @inheritDoc **/
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}
