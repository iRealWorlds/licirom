import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesDetailsComponent } from '@licirom/modules/admin/auction-categories/categories-details/categories-details.component';

describe('CategoriesDetailsComponent', () => {
  let component: CategoriesDetailsComponent;
  let fixture: ComponentFixture<CategoriesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriesDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
