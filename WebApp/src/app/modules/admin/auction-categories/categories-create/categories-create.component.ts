import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuctionCategoriesService } from '@licirom/modules/admin/auction-categories/auction-categories.service';
import { AuctionCategoryCreateRequest } from '@licirom/modules/admin/auction-categories/auction-category-create.request';

@Component({
  selector: 'app-categories-create',
  templateUrl: './categories-create.component.html',
  styleUrls: ['./categories-create.component.scss']
})


export class CategoriesCreateComponent {
  categoryForm = new FormGroup({
    name: new FormControl('', { validators: [Validators.required], nonNullable: true  }),
    description: new FormControl('', { nonNullable: true })
  });

  private _loading = false;

  /**
   * AuctionCategoriesCreateComponent constructor method.
   */
  constructor(
    private readonly _categoryService: AuctionCategoriesService,
    private readonly _router: Router,
    private readonly _toastService: MatSnackBar
    
  ){

  }

  /**
   * Get the current loading state.
   */
  get loading(): boolean {
    return this._loading;
  }

  /**
   * Set a new loading state.
   *
   * @param value
   */
  set loading(value: boolean) {
    this._loading = value;

    if (value) {
      this.categoryForm.disable();
    } else {
      this.categoryForm.enable();
    }
  }

  /**
   * Send a request to create an auction from the current form state.
   */
  createCategory(): void {
    // If already loading, throw an error
    if (this.loading) {
      throw new Error('Already creating a category.');
    }

    // Mark the form as touched to display validation errors
    this.categoryForm.markAllAsTouched();

    if (this.categoryForm.valid) {
      // Build the request data
      const data = new AuctionCategoryCreateRequest({
        name: this.categoryForm.controls.name.value,
        description: this.categoryForm.controls.description.value, // TODO
      });

      // Send the request
      this.loading = true;
      this._categoryService.create(data).subscribe({
        next: async () => {
          await this._router.navigate(['/admin/categories']);
          this._toastService.open('Category created successfully.', 'Close');
          this.loading = false;
        },
        error: () => {
          this.loading = false;
          this._toastService.open('Category could not be created.', 'Close');
        }
      });
    }
  }
}

