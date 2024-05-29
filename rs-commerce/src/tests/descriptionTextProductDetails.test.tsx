import { render, screen } from '@testing-library/react';
import DescriptionText from 'views/productDetails/components/DesctiptionText';

describe('Description Text Product Details', () => {
  it('should render description text', () => {
    const text = 'some description';
    render(<DescriptionText description={text} />);
    expect(screen.getByText(text)).toBeInTheDocument();
  });
});
