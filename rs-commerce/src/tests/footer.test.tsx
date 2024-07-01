import { render, screen } from '@testing-library/react';
import Footer from 'components/layout/Footer';
import { MemoryRouter } from 'react-router-dom';

describe('Footer render', () => {
  it('should render footer block', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Footer />
      </MemoryRouter>,
    );
    expect(screen.getByText('2024 HurricaneTeam RS School')).toBeInTheDocument();
  });
});
