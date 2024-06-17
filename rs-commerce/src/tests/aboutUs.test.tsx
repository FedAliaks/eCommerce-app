import { render, screen } from '@testing-library/react';
import { ROUTE_PATH } from 'constants/constants';
import { MemoryRouter } from 'react-router-dom';
import AboutUs from 'views/AboutUs/AboutUs';
import TeamItem from 'views/AboutUs/components/TeamItem';

describe('About Us page', () => {
  it('should render About us content', () => {
    render(
      <MemoryRouter initialEntries={[ROUTE_PATH.main]}>
        <AboutUs />
      </MemoryRouter>,
    );

    expect(screen.getByText('Our secrets of successful collaboration')).toBeInTheDocument();
  });

  it('should render About us Team member card', () => {
    const name = 'Alexander';
    const position = 'Developer';
    const github = 'https://github.com';
    const description = 'Some short bio description';

    const member = {
      name,
      position,
      github,
      description,
      image: '',
      contribution: [],
    };
    render(<TeamItem item={member} />);

    expect(screen.getByText(name)).toBeInTheDocument();
    expect(screen.getByText(position)).toBeInTheDocument();
    expect(screen.getByText(description)).toBeInTheDocument();
  });
});
