import ButtonDefault from 'components/button-default/ButtonDefault';
import { useState } from 'react';
import apiRootWithExistingTokenFlow from 'SDK/apiRootWithExistingTokenFlow';
import { apiAuthSelector } from 'redux/selectors';
import { useAppSelector } from 'hooks/typed-react-redux-hooks';
import apiRootWithAnonymousSessionFlow from 'SDK/apiRootWithAnonymousSessionFlow';
import { LOCAL_STORAGE_ANONYM_CART_ID, LOCAL_STORAGE_AUTH_CART_ID } from 'constants/constants';
import classes from './cartTotal.module.css';

export type CartTotalType = {
  totalPrice: number;
  discounted: number | undefined;
  updateCart: () => void;
};

export default function CartTotal(props: CartTotalType): JSX.Element {
  const { totalPrice, discounted, updateCart } = props;
  const [promoCode, setPromoCode] = useState('');
  const [promoCodeMsg, setPromoCodeMsg] = useState('');
  const { isAuth } = useAppSelector(apiAuthSelector);
  const idAnonymCart: string = localStorage.getItem(LOCAL_STORAGE_ANONYM_CART_ID) as string;
  const idAuthCart: string = localStorage.getItem(LOCAL_STORAGE_AUTH_CART_ID) as string;

  const usePromoCode = () => {
    if (isAuth) {
      apiRootWithExistingTokenFlow()
        .carts()
        .withId({ ID: idAnonymCart })
        .get()
        .execute()
        .then((res) => {
          apiRootWithExistingTokenFlow()
            .carts()
            .withId({ ID: idAuthCart })
            .post({
              body: {
                version: res.body.version,
                actions: [
                  {
                    action: 'addDiscountCode',
                    code: promoCode.toUpperCase(),
                  },
                ],
              },
            })
            .execute()
            .then(() => {
              updateCart();
              setPromoCodeMsg('promo code applied');
            })

            .catch(console.log);
        });
    } else {
      apiRootWithAnonymousSessionFlow()
        .carts()
        .withId({ ID: idAnonymCart })
        .get()
        .execute()
        .then((res) => {
          apiRootWithAnonymousSessionFlow()
            .carts()
            .withId({ ID: idAnonymCart })
            .post({
              body: {
                version: res.body.version,
                actions: [
                  {
                    action: 'addDiscountCode',
                    code: promoCode.toUpperCase(),
                  },
                ],
              },
            })
            .execute()
            .then(() => {
              setPromoCodeMsg('promo code applied');
              updateCart();
            })
            .catch(console.log);
        });
    }
  };

  const changePromoInputField = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPromoCode(e.target.value);
  };

  return (
    <div className={classes['cart-total__container']}>
      <h2 className={classes['cart-total__title']}>Cart Total</h2>

      <div className={classes['cart-total__sum-block']}>
        <p className={classes['cart-total__subtitle']}>Subtotal</p>
        <p
          className={
            classes['cart-total__sum']
          }>{`${discounted ? (totalPrice + discounted) / 100 : totalPrice / 100} EUR`}</p>
      </div>

      {discounted ? (
        <div className={classes['cart-total__sum-block']}>
          <p className={classes['cart-total__subtitle']}>Discounted</p>
          <p className={classes['cart-total__sum']}>{`${discounted / 100} EUR`}</p>
        </div>
      ) : null}

      <div className={classes['cart-total__sum-block']}>
        <p className={classes['cart-total__subtitle']}>Total</p>
        <p className={classes['cart-total__sum_colored']}>{`${totalPrice / 100} EUR`}</p>
      </div>

      <div className={classes['cart-total__promo-container']}>
        <input
          type="text"
          placeholder="Input Promo Code"
          className={classes['cart-total__promo']}
          onChange={(e) => changePromoInputField(e)}
        />
        <ButtonDefault content="Apply" colored onClick={usePromoCode} isActive small />
      </div>
      <p>{promoCodeMsg}</p>
    </div>
  );
}
