import { LineItem } from '@commercetools/platform-sdk';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from 'redux/configure-store';
import CartProduct from 'views/cart/cartFull/cartProduct/CartProduct';

describe('Cart Product render', () => {
  it('should render cart product block', () => {
    const name = 'book1';
    const price = 1000;
    const discountPrice = 600;
    const totalPrice = price - discountPrice;

    const product = {
      id: '7fc1b074-60a8-40ed-9ca8-5065e6352f06',
      productId: '27bf7853-765e-4ec8-89ef-fce361c6e9f8',
      productKey: 'book2',
      name: {
        en: name,
      },
      productType: {
        typeId: 'product-type',
        id: 'bc841401-5257-47c3-b608-225f04032650',
        version: 8,
      },
      productSlug: {
        en: name,
      },
      variant: {
        id: 1,
        sku: 'SKU-2',
        prices: [
          {
            id: 'f957ed71-8046-4876-b6e3-a84ec72a6d81',
            value: {
              type: 'centPrecision',
              currencyCode: 'EUR',
              centAmount: price,
              fractionDigits: 2,
            },
            discounted: {
              value: {
                type: 'centPrecision',
                currencyCode: 'EUR',
                centAmount: discountPrice,
                fractionDigits: 2,
              },
              discount: {
                typeId: 'product-discount',
                id: '449eed47-89eb-491f-a37b-777610a7f27a',
              },
            },
          },
        ],
        images: [
          {
            url: 'https://m.media-amazon.com/images/I/61NAx5pd6XL._SY445_SX342_.jpg',
            label: 'image1',
            dimensions: {
              w: 303,
              h: 197,
            },
          },
          {
            url: 'https://m.media-amazon.com/images/I/51rIWdudtnL._SY466_.jpg',
            label: 'image2',
            dimensions: {
              w: 303,
              h: 197,
            },
          },
        ],
        attributes: [
          {
            name: 'author',
            value: 'George Orwell',
          },
          {
            name: 'rating',
            value: 4.6,
          },
          {
            name: 'description',
            value: 'A dystopian social science fiction novel.',
          },
          {
            name: 'cover',
            value: 'Paperback',
          },
          {
            name: 'publicationYear',
            value: 1949,
          },
          {
            name: 'publisher',
            value: 'Secker & Warburg',
          },
          {
            name: 'format',
            value: 'A5',
          },
        ],
        assets: [],
      },
      price: {
        id: 'f957ed71-8046-4876-b6e3-a84ec72a6d81',
        value: {
          type: 'centPrecision',
          currencyCode: 'EUR',
          centAmount: price,
          fractionDigits: 2,
        },
        discounted: {
          value: {
            type: 'centPrecision',
            currencyCode: 'EUR',
            centAmount: discountPrice,
            fractionDigits: 2,
          },
          discount: {
            typeId: 'product-discount',
            id: '449eed47-89eb-491f-a37b-777610a7f27a',
          },
        },
      },
      quantity: 1,
      discountedPricePerQuantity: [],
      perMethodTaxRate: [],
      addedAt: '2024-06-17T16:31:23.852Z',
      lastModifiedAt: '2024-06-17T16:31:23.852Z',
      state: [
        {
          quantity: 1,
          state: {
            typeId: 'state',
            id: 'af78f735-5074-4322-bd9a-2c6e2a1b1d55',
          },
        },
      ],
      priceMode: 'Platform',
      lineItemMode: 'Standard',
      totalPrice: {
        type: 'centPrecision',
        currencyCode: 'EUR',
        centAmount: totalPrice,
        fractionDigits: 2,
      },
      taxedPricePortions: [],
    };

    render(
      <Provider store={store}>
        <CartProduct product={product as LineItem} updateCart={() => {}} />
      </Provider>,
    );

    expect(screen.getByText(name)).toBeInTheDocument();
    expect(screen.getByText(`${totalPrice / 100} EUR`)).toBeInTheDocument();
    expect(screen.getByText(`${discountPrice / 100} EUR`)).toBeInTheDocument();
  });
});
