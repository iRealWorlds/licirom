import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TicketDetailsComponent } from '@licirom/modules/support/ticket-details/ticket-details.component';


describe('TicketDetailsComponent', () => {
  let component: TicketDetailsComponent;
  let fixture: ComponentFixture<TicketDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
