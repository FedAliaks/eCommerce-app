import apiRootWithExistingTokenFlow from 'SDK/apiRootWithExistingTokenFlow';
import { useEffect, useState } from 'react';
import CartFull from './cartFull/CartFul';
import CartEmpty from './cartEmpty/CartEmpty';
import classes from './cartPage.module.css';

export default function Cart(): JSX.Element {
  const [countInCart, setCountInCart] = useState<number>(0);

  useEffect(() => {
    apiRootWithExistingTokenFlow()
      .me()
      .carts()
      .get()
      .execute()
      .then((res) => {
        setCountInCart(res.body.count);
      })
      .catch();
  }, []);

  return (
    <div className={classes['cart-page__container']}>
      {countInCart > 0 ? <CartFull /> : <CartEmpty />}
    </div>
  );
}
