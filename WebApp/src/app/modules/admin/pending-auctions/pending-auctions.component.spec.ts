import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingAuctionsComponent } from './pending-auctions.component';

describe('PendingAuctionsComponent', () => {
  let component: PendingAuctionsComponent;
  let fixture: ComponentFixture<PendingAuctionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingAuctionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingAuctionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
