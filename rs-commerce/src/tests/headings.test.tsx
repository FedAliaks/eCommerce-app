import { render, screen } from '@testing-library/react';
import { Heading, SubHeading } from 'components/heading';

describe('Heading render', () => {
  it('should render heading text', () => {
    const text = 'some heading';
    render(<Heading>{text}</Heading>);
    expect(screen.getByText(text)).toBeInTheDocument();
  });

  it('should render subheading text', () => {
    const text = 'some subheading';
    render(<SubHeading>{text}</SubHeading>);
    expect(screen.getByText(text)).toBeInTheDocument();
  });
});
