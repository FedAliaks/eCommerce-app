import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { store } from 'redux/configure-store';
import routes from 'utils/routes';
import LoginPage from 'views/login/Login';
import MainPage from 'views/main/Main';
import RegistrationPage from 'views/registration/Registration';

describe('Routing', () => {
  it('should render the main page by default', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText('Explore the fascinating world of books')).toBeInTheDocument();
  });

  it('should render the login page when the route matches', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/login']}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText("Don't have an account yet?")).toBeInTheDocument();
  });

  it('should render the registration page when the route matches', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/registration']}>
          <Routes>
            <Route path="/registration" element={<RegistrationPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText('I have an account')).toBeInTheDocument();
  });

  it('should render Not Found Page for unknown URL', () => {
    render(
      <MemoryRouter initialEntries={['/unknown-path']}>
        <Routes>
          {routes.map((route) => (
            <Route path={route.path} element={route.component} />
          ))}
        </Routes>
      </MemoryRouter>,
    );

    expect(
      screen.getByText('Oops! The page you are looking for does not exist!'),
    ).toBeInTheDocument();
  });
});
