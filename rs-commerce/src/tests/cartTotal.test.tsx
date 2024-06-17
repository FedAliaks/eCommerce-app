import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from 'redux/configure-store';

import CartTotal from 'views/cart/cartFull/cartTotal/cartTotal';

describe('Cart Total render', () => {
  it('should render cart total block', () => {
    const totalPrice = 4000;
    const discounted = 200;
    render(
      <Provider store={store}>
        <CartTotal totalPrice={totalPrice} discounted={discounted} updateCart={() => {}} />
      </Provider>,
    );
    expect(screen.getByText(`${(totalPrice + discounted) / 100} EUR`)).toBeInTheDocument();
    expect(screen.getByText(`${totalPrice / 100} EUR`)).toBeInTheDocument();
    expect(screen.getByText(`${discounted / 100} EUR`)).toBeInTheDocument();
  });
});
