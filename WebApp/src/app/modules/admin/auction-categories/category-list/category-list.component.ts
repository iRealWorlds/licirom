import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit, OnDestroy{
  private readonly _unsubscribeAll = new Subject<void>();
/**
 * 
 */
  constructor(
    private readonly _activatedRoute: ActivatedRoute
  ) {
  }

  /** @inheritDoc **/
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  
  /** @inheritDoc **/
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}
