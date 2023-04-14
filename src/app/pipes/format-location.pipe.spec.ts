import { removeHyphensPipe } from './removeHyphens';

describe('FormatLocationPipe', () => {
  it('create an instance', () => {
    const pipe = new removeHyphensPipe();
    expect(pipe).toBeTruthy();
  });
});
