import { Category } from '@commercetools/platform-sdk';
import { render, screen } from '@testing-library/react';
import CategoryItem from 'components/category-item/category-item';
import { ROUTE_PATH } from 'constants/constants';
import { MemoryRouter } from 'react-router-dom';
import { Nullable } from 'types/types';

describe('Breadcrumb Common', () => {
  it('should have links on previous pages', () => {
    const name = 'Fiction';
    const category = {
      ancestors: [{ typeId: 'category', id: 'categoryId1' }],
      assets: [],
      createdAt: '2024-05-22T18:03:03.644Z',
      createdBy: { clientId: 'clientId', isPlatformClient: false },
      id: 'id1',
      key: 'fiction',
      lastMessageSequenceNumber: 1,
      lastModifiedAt: '2024-05-22T18:19:08.679Z',
      lastModifiedBy: {
        isPlatformClient: true,
        user: { typeId: 'user', id: 'userId' },
      },
      name: { en: name },
      orderHint: '0.1',
      parent: { typeId: 'category', id: 'categoryId0' },
      slug: { en: 'fiction' },
      version: 2,
      versionModifiedAt: '2024-05-22T18:19:08.679Z',
    };

    render(
      <MemoryRouter
        initialEntries={[
          `${ROUTE_PATH.catalog}${category?.slug.en ? `/${category?.slug.en}` : ''}`,
        ]}>
        <CategoryItem data={category as Nullable<Category>} />
      </MemoryRouter>,
    );

    expect(screen.getByText(name)).toBeInTheDocument();
  });
});
