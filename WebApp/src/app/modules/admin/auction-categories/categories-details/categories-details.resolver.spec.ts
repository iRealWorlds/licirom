import { TestBed } from '@angular/core/testing';
import { CategoriesDetailsResolver } from '@licirom/modules/admin/auction-categories/categories-details/categories-details.resolver';

describe('CategoriesDetailsResolver', () => {
  let resolver: CategoriesDetailsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(CategoriesDetailsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
