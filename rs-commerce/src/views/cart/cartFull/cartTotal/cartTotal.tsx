import ButtonDefault from 'components/button-default/ButtonDefault';
import { useState } from 'react';
import apiRootWithExistingTokenFlow from 'SDK/apiRootWithExistingTokenFlow';
import { apiAuthSelector } from 'redux/selectors';
import { useAppSelector } from 'hooks/typed-react-redux-hooks';
import apiRootWithAnonymousSessionFlow from 'SDK/apiRootWithAnonymousSessionFlow';
import classes from './cartTotal.module.css';

export type CartTotalType = {
  totalPrice: number;
  idCart: string;
  discounted: number | undefined;
};

export default function CartTotal(props: CartTotalType): JSX.Element {
  const { totalPrice, idCart, discounted } = props;
  const [promoCode, setPromoCode] = useState('');
  const { isAuth } = useAppSelector(apiAuthSelector);
  const idCartResponse: string = localStorage.getItem('hurricane_anonym_cart') as string;

  const usePromoCode = () => {
    if (isAuth) {
      apiRootWithExistingTokenFlow()
        .carts()
        .withId({ ID: idCart })
        .get()
        .execute()
        .then((res) => {
          apiRootWithExistingTokenFlow()
            .carts()
            .withId({ ID: idCart })
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
            .then((result) => console.log(result))
            .catch(console.log);
        });
    } else {
      apiRootWithAnonymousSessionFlow()
        .carts()
        .withId({ ID: idCartResponse })
        .get()
        .execute()
        .then((res) => {
          apiRootWithAnonymousSessionFlow()
            .carts()
            .withId({ ID: idCartResponse })
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
            .then((result) => console.log(result))
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
    </div>
  );
}
