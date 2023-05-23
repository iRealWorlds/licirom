import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuctionUpdateComponent } from '@licirom/modules/auctions/auction-update/auction-update.component';


describe('AuctionUpdateComponent', () => {
  let component: AuctionUpdateComponent;
  let fixture: ComponentFixture<AuctionUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuctionUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuctionUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
