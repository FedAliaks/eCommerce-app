import getRequestErrorMessage from 'utils/utils';

describe('Utils check', () => {
  it('should return errors text message for requests', async () => {
    const errorCode400 = 400;
    const actualMessage400 = getRequestErrorMessage(errorCode400);
    expect(actualMessage400).toBe('Oops... Bad request');

    const errorCode404 = 404;
    const actualMessage404 = getRequestErrorMessage(errorCode404);
    expect(actualMessage404).toBe('Oops... Requested data not found');

    const errorCode500 = 500;
    const actualMessage500 = getRequestErrorMessage(errorCode500);
    expect(actualMessage500).toBe('Oops... Server error');
  });
});
