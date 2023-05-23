import { TestBed } from '@angular/core/testing';

import { ProfileResolver } from '@licirom/modules/profile/profile.resolver';

describe('ProfileResolver', () => {
  let resolver: ProfileResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ProfileResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
