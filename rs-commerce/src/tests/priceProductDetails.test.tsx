import { render, screen } from '@testing-library/react';
import Price from 'views/productDetails/components/Price';

describe('Price Product Details', () => {
  it('should render only full price without discount', () => {
    render(<Price price={{ centAmount: 1000, currencyCode: 'USD' }} discount={null} />);
    expect(screen.getByText('10.00 USD')).toBeInTheDocument();
  });

  it('should render only full price with discount', () => {
    render(
      <Price
        price={{ centAmount: 1000, currencyCode: 'USD' }}
        discount={{ centAmount: 800, currencyCode: 'USD' }}
      />,
    );
    expect(screen.getByText('8.00 USD')).toBeInTheDocument();
    expect(screen.getByText('10.00 USD')).toBeInTheDocument();
  });
});
