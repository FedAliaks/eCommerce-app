import apiRootWithExistingTokenFlow from 'SDK/apiRootWithExistingTokenFlow';
import { useEffect, useState } from 'react';
import Breadcrumb from 'components/breadcrumb/Breadcrumb';
import { ROUTE_PATH } from 'constants/constants';
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

  const cartBreadcrumbList = [
    {
      name: 'Main',
      link: ROUTE_PATH.main,
    },
    {
      name: 'Cart',
      link: null,
    },
  ];

  return (
    <div>
      <Breadcrumb linksList={cartBreadcrumbList} currentPageName="Your cart" />

      <div className={classes['cart-page__container']}>
        {countInCart > 0 ? <CartFull /> : <CartEmpty />}
      </div>
    </div>
  );
}
