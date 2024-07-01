import { render, screen } from '@testing-library/react';
import Breadcrumb from 'components/breadcrumb/Breadcrumb';
import { ROUTE_PATH } from 'constants/constants';
import { MemoryRouter } from 'react-router-dom';

describe('Breadcrumb Common', () => {
  it('should have links on previous pages', () => {
    const header = 'Catalog';
    const linksList = [{ link: ROUTE_PATH.main, name: 'Main' }];

    render(
      <MemoryRouter initialEntries={linksList.map((link) => link.link)}>
        <Breadcrumb currentPageName={header} linksList={linksList} />
      </MemoryRouter>,
    );

    expect(screen.getByText(header)).toBeInTheDocument();
    linksList.map((link) => expect(screen.getByText(link.name)).toBeInTheDocument());
  });
});
