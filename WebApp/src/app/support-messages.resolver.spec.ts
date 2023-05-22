import { TestBed } from '@angular/core/testing';

import { SupportMessagesResolver } from './modules/support/ticket-details/support-messages.resolver';

describe('SupportMessagesResolver', () => {
  let resolver: SupportMessagesResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(SupportMessagesResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
