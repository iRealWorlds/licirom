import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuctionCategoryService } from '@licirom/modules/auctions/auction-category.service';

@Component({
  selector: 'app-categories-create',
  templateUrl: './categories-create.component.html',
  styleUrls: ['./categories-create.component.scss']
})


export class CategoriesCreateComponent {
  /**
 * 
 */
  constructor(
    private readonly _categoryService: AuctionCategoryService,
    private readonly _router: Router,
    private readonly _toastService: MatSnackBar
    
  ){

  }
}
