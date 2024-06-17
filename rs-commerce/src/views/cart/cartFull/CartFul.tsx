import apiRootWithExistingTokenFlow from 'SDK/apiRootWithExistingTokenFlow';

import { Cart } from '@commercetools/platform-sdk';
import ButtonBig from 'components/button-big/button-big';
import { useAppSelector } from 'hooks/typed-react-redux-hooks';
import { apiAuthSelector } from 'redux/selectors';
import apiRootWithAnonymousSessionFlow from 'SDK/apiRootWithAnonymousSessionFlow';
import { LOCAL_STORAGE_ANONYM_CART_ID, LOCAL_STORAGE_AUTH_CART_ID } from 'constants/constants';
import classes from './cartFull.module.css';
import CartProduct from './cartProduct/CartProduct';
import CartTotal from './cartTotal/cartTotal';

type CartFullType = {
  setUpdateAllCart: React.Dispatch<React.SetStateAction<number>>;
  cartBody?: Cart;
};

export default function CartFull(props: CartFullType): JSX.Element {
  const { setUpdateAllCart, cartBody } = props;
  const { isAuth } = useAppSelector(apiAuthSelector);
  const idAnonymCart: string = localStorage.getItem(LOCAL_STORAGE_ANONYM_CART_ID) as string;
  const idAuthCart: string = localStorage.getItem(LOCAL_STORAGE_AUTH_CART_ID) as string;

  const updateCart = (): void => {
    setUpdateAllCart(Math.random);
    console.log('update product');
  };

  const clearCart = () => {
    console.log('clear Cart');

    if (isAuth) {
      console.log('auth');
      apiRootWithExistingTokenFlow()
        .carts()
        .withId({ ID: idAuthCart })
        .get()
        .execute()
        .then((res) => {
          apiRootWithExistingTokenFlow()
            .carts()
            .withId({ ID: idAuthCart })
            .delete({
              queryArgs: {
                version: res.body.version,
              },
            })
            .execute()
            .then(() => {
              apiRootWithExistingTokenFlow()
                .me()
                .carts()
                .post({
                  body: {
                    currency: 'EUR',
                  },
                })
                .execute()
                .then((result) => {
                  console.log(result);
                  localStorage.setItem(LOCAL_STORAGE_AUTH_CART_ID, result.body.id);
                  updateCart();
                })
                .catch((err) => console.log(err));
            });
        });
    } else {
      console.log('no auth');
      apiRootWithAnonymousSessionFlow()
        .carts()
        .withId({ ID: idAnonymCart })
        .get()
        .execute()
        .then((res) => {
          apiRootWithAnonymousSessionFlow()
            .carts()
            .withId({ ID: idAnonymCart })
            .delete({
              queryArgs: {
                version: res.body.version,
              },
            })
            .execute()
            .then(() => {
              apiRootWithAnonymousSessionFlow()
                .me()
                .carts()
                .post({
                  body: {
                    currency: 'EUR',
                  },
                })
                .execute()
                .then((result) => {
                  console.log(result);
                  localStorage.setItem(LOCAL_STORAGE_ANONYM_CART_ID, result.body.id);
                  updateCart();
                })
                .catch((err) => console.log(err));
            });
        });
    }
  };

  const headerColumnArr = ['Product', 'Price', 'Quantity', 'Total cost'];

  return (
    <div className={classes['cart-full__container']}>
      <div>
        <div className={classes['cart-full__product-column-header']}>
          {headerColumnArr.map((item, index) => (
            <p className={index === 0 ? `${classes['column1']}` : undefined} key={`header${item}`}>
              {item}
            </p>
          ))}
        </div>
        <div className={classes['products__container']}>
          {cartBody?.lineItems.map((item) => (
            <CartProduct product={item} updateCart={updateCart} />
          ))}
          <div className={classes['product__clear-btn-container']}>
            <ButtonBig content="Clear Shopping Cart" isActiveStyle onClick={clearCart} />
          </div>
        </div>
      </div>
      <CartTotal
        updateCart={updateCart}
        discounted={cartBody?.discountOnTotalPrice?.discountedAmount.centAmount}
        totalPrice={cartBody?.totalPrice.centAmount || 100}
      />
    </div>
  );
}
