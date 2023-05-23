import { ExpandablePipe } from '@licirom/modules/shared/expandable-pipe/expandable.pipe';

describe('ExpandablePipe', () => {
  it('create an instance', () => {
    const pipe = new ExpandablePipe();
    expect(pipe).toBeTruthy();
  });
});
