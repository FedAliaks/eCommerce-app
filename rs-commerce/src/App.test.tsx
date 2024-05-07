import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import LoginPage from 'views/login/Login';
import MainPage from 'views/main/Main';
import RegistrationPage from 'views/registration/Registration';

describe('Routing', () => {
  it('should render the main page by default', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText('Main page')).toBeInTheDocument();
  });

  it('should render the login page when the route matches', () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText('Login page')).toBeInTheDocument();
  });

  it('should render the registration page when the route matches', () => {
    render(
      <MemoryRouter initialEntries={['/registration']}>
        <Routes>
          <Route path="/registration" element={<RegistrationPage />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText('Registration page')).toBeInTheDocument();
  });
});
