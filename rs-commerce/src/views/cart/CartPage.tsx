import apiRootWithExistingTokenFlow from 'SDK/apiRootWithExistingTokenFlow';
import { useEffect, useState } from 'react';
import Breadcrumb from 'components/breadcrumb/Breadcrumb';
import {
  LOCAL_STORAGE_ANONYM_CART_ID,
  LOCAL_STORAGE_AUTH_CART_ID,
  LOCAL_STORAGE_TOKEN,
  ROUTE_PATH,
} from 'constants/constants';
import apiRootWithAnonymousSessionFlow from 'SDK/apiRootWithAnonymousSessionFlow';
import { Cart } from '@commercetools/platform-sdk';
import CartFull from './cartFull/CartFul';
import CartEmpty from './cartEmpty/CartEmpty';
import classes from './cartPage.module.css';

export default function CartPage(): JSX.Element {
  const [countInCart, setCountInCart] = useState<number>(0);
  const [updateCart, setUpdateAllCart] = useState(0);
  const [cartBody, setCartBody] = useState<Cart>();

  const isAuth = JSON.parse(localStorage.getItem(LOCAL_STORAGE_TOKEN)!);
  const idAnonymCart: string = localStorage.getItem(LOCAL_STORAGE_ANONYM_CART_ID) as string;
  const idAuthCart: string = localStorage.getItem(LOCAL_STORAGE_AUTH_CART_ID) as string;

  useEffect(() => {
    if (isAuth) {
      apiRootWithExistingTokenFlow()
        .carts()
        .withId({ ID: idAuthCart })
        .get()
        .execute()
        .then((res) => {
          setCountInCart(res.body.lineItems.length || 0);
          setCartBody(res.body);
        })
        .catch();
    } else {
      apiRootWithAnonymousSessionFlow()
        .carts()
        .withId({ ID: idAnonymCart })
        .get()
        .execute()
        .then((res) => {
          setCountInCart(res.body.lineItems.length || 0);
          setCartBody(res.body);
        })
        .catch();
    }
  }, [updateCart]);

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

      <div className={`container ${classes['cart-container']}`}>
        {countInCart > 0 ? (
          <CartFull cartBody={cartBody} setUpdateAllCart={setUpdateAllCart} />
        ) : (
          <CartEmpty />
        )}
      </div>
    </div>
  );
}
