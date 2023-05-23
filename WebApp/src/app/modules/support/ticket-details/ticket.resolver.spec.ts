import { TestBed } from '@angular/core/testing';
import { TicketResolver } from '@licirom/modules/support/ticket-details/ticket.resolver';

describe('TicketResolver', () => {
  let resolver: TicketResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(TicketResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
