import { NullToWordPipe } from './null-to-word.pipe';

describe('NullToWordPipe', () => {
  it('create an instance', () => {
    const pipe = new NullToWordPipe();
    expect(pipe).toBeTruthy();
  });
});
