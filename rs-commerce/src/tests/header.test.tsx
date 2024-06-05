import { render, screen } from '@testing-library/react';
import Header from 'components/layout/Header';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { store } from 'redux/configure-store';

describe('Header render', () => {
  it('should render header block', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Header />
        </MemoryRouter>
      </Provider>,
    );
    expect(screen.getByText('Hurricane bookstore')).toBeInTheDocument();
  });
});
