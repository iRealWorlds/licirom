import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  SearchableModelInputComponent
} from '@licirom/modules/shared/searchable-model-input/searchable-model-input.component';


describe('SearchableModelInputComponent', () => {
  let component: SearchableModelInputComponent<unknown>;
  let fixture: ComponentFixture<SearchableModelInputComponent<unknown>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchableModelInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchableModelInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
