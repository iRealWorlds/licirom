import { TestBed } from '@angular/core/testing';

import { AdminCategoriesService } from '@licirom/modules/admin/auction-categories/auction-categories.service';

describe('AdminCategoriesService', () => {
  let service: AdminCategoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminCategoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
