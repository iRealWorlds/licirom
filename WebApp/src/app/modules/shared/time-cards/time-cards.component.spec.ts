import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TimeCardsComponent } from '@licirom/modules/shared/time-cards/time-cards.component';

describe('TimeCardsComponent', () => {
  let component: TimeCardsComponent;
  let fixture: ComponentFixture<TimeCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeCardsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
