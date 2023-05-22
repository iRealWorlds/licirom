import { CommonModule } from '@angular/common';
import { Component , Input} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { AuctionCategoryModel } from '@licirom/modules/admin/auction-categories/auction-category.model';

@Component({
  selector: 'app-category-card',
  standalone: true,
  imports:[CommonModule, MatCardModule,RouterLink],
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.scss']
})
export class CategoryCardComponent {
  @Input() category?: AuctionCategoryModel;
}
