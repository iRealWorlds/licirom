import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuctionsCreateComponent } from '@licirom/modules/auctions/auctions-create/auctions-create.component';

describe('AuctionsCreateComponent', () => {
  let component: AuctionsCreateComponent;
  let fixture: ComponentFixture<AuctionsCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuctionsCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuctionsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
