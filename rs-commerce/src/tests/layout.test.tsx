import { render, screen } from '@testing-library/react';
import Layout from 'components/layout/Layout';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { store } from 'redux/configure-store';

describe('Layout render', () => {
  it('should render layout block', () => {
    const text = 'Some main content';

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Layout>{text}</Layout>
        </MemoryRouter>
      </Provider>,
    );
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText(text)).toBeInTheDocument();
    expect(screen.getByText('2024 HurricaneTeam RS School')).toBeInTheDocument();
  });
});
