import { render } from '@testing-library/react';
import Loader from 'components/loader/loader';
import { Provider } from 'react-redux';
import { store } from 'redux/configure-store';

describe('Loader check', () => {
  it('should show loader when isShow = true', async () => {
    render(
      <Provider store={store}>
        <Loader isShow />
      </Provider>,
    );

    const element = document.querySelector('loader');

    if (element) expect(element.classList).toContain('show');
  });
});
