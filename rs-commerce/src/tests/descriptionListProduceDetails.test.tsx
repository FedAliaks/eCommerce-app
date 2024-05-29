import { render, screen } from '@testing-library/react';
import DescriptionList from 'views/productDetails/components/DesctiptionList';

describe('Price Product Details', () => {
  it('should render only full price without discount', () => {
    render(<DescriptionList descriptionList={{ 'Publication Year': '2022' }} />);
    expect(screen.getByText('Publication Year: 2022')).toBeInTheDocument();
  });
});
