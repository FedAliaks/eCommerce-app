import { ProductProjection } from '@commercetools/platform-sdk';
import { render, screen } from '@testing-library/react';
import ProductItem from 'components/product-item/product-item';
import { ROUTE_PATH } from 'constants/constants';
import { MemoryRouter } from 'react-router-dom';

describe('Product card render', () => {
  it('should render product card', () => {
    const name = 'The Great Gatsby';
    const author = 'George Orwell';
    const publicationYear = '1990';
    const rating = 4.6;
    const price = 1900;
    const discountPrice = 1615;
    const currency = 'EUR';

    const product = {
      categories: [{ typeId: 'category', id: 'categoryId1' }],
      categoryOrderHints: {},
      createdAt: '2024-05-23T11:12:02.294Z',
      hasStagedChanges: false,
      id: 'id1',
      key: 'book1',
      lastModifiedAt: '2024-06-03T08:42:12.699Z',
      masterVariant: {
        attributes: [
          { name: 'author', value: author },
          { name: 'rating', value: rating },
          { name: 'description', value: 'A dystopian social science fiction novel.' },
          { name: 'cover', value: 'Paperback' },
          { name: 'publicationYear', value: publicationYear },
        ],
        assets: [],
        id: 1,
        images: [],
        prices: [
          {
            discounted: {
              value: {
                type: 'centPrecision',
                currencyCode: currency,
                centAmount: discountPrice,
                fractionDigits: 2,
              },
              discount: { typeId: 'product-discount', id: 'product-discountId1' },
            },
            id: 'pricesId1',
            value: {
              type: 'centPrecision',
              currencyCode: currency,
              centAmount: price,
              fractionDigits: 2,
            },
          },
        ],
        sku: '1987',
      },
      name: { en: name },
      productType: { typeId: 'product-type', id: 'typeId1' },
      published: true,
      searchKeywords: {},
      slug: { en: 'the-great-gatsby' },
      variants: [],
      version: 6,
    };

    render(
      <MemoryRouter initialEntries={[`${ROUTE_PATH.productDetails}/${product.id}`]}>
        <ProductItem product={product as ProductProjection} />
      </MemoryRouter>,
    );

    expect(screen.getByText(name)).toBeInTheDocument();
    expect(screen.getByText(`${author}, ${publicationYear}`)).toBeInTheDocument();
    expect(screen.getByText(`Rating: ${rating}`)).toBeInTheDocument();
    expect(screen.getByText(`${currency} ${(discountPrice / 100).toFixed(0)}`)).toBeInTheDocument();
    expect(screen.getByText(`${currency} ${(price / 100).toFixed(2)}`)).toBeInTheDocument();
  });
});
