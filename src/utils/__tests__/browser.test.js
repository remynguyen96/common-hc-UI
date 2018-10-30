import { hasGetUserMedia } from '../browser';

describe('utils/browser.js', () => {
  test('hasGetUserMedia should return boolean browser support', () => {
    const userMedia = hasGetUserMedia();
    expect(userMedia).toBeFalsy();
  });
});
