import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Breadcrumbs } from 'views/productDetails/components';
import breadcrumbsLinks from 'views/productDetails/components/constants';

describe('Breadcrumb Product Details', () => {
  it('should have links on main and catalog and product name', () => {
    render(
      <MemoryRouter initialEntries={breadcrumbsLinks.map((link) => link.path)}>
        <Breadcrumbs productName="The Great Gatsby" breadcrumbLinks={breadcrumbsLinks} />
      </MemoryRouter>,
    );
    expect(screen.getByText('The Great Gatsby')).toBeInTheDocument();
    breadcrumbsLinks.map((link) => expect(screen.getByText(link.name)).toBeInTheDocument());
  });
});
