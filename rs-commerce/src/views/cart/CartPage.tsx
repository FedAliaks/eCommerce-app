import apiRootWithExistingTokenFlow from 'SDK/apiRootWithExistingTokenFlow';
import { useEffect, useState } from 'react';
import Breadcrumb from 'components/breadcrumb/Breadcrumb';
import { ROUTE_PATH } from 'constants/constants';
import CartFull from './cartFull/CartFul';
import CartEmpty from './cartEmpty/CartEmpty';
import classes from './cartPage.module.css';

export default function Cart(): JSX.Element {
  const [countInCart, setCountInCart] = useState<number>(0);

  // createCart

  /*   apiRootWithExistingTokenFlow().me().carts().post({
    body: {
      currency: "EUR"
    }
  }).execute().then(
    
      res => console.log(res)
    
  ).catch(err => console.log(err)) */

  // add position in cart

  // 57c69d29-4263-4fb5-b374-81abf0ec2094
  // 9935ab95-8859-4530-8341-51bf96b33487
  // 5160a3bd-7fb7-43f2-9b05-96c0e8b115f5

  /*            apiRootWithExistingTokenFlow().me().carts().get().execute().then(res => {
    console.log(res.body.results[0]);

    if (res.body.results[0]?.customerId) {
      apiRootWithExistingTokenFlow().carts().withId({ID: res.body.results[0].id}).post({
        body: {
          version: res.body.results[0].version,
          actions: [
            {
              action: 'addLineItem',
              productId: '9935ab95-8859-4530-8341-51bf96b33487',
              quantity: 1
            }
          ]

        }
      }).execute().then(res => console.log(res)).catch(err => console.log(err))

    }
  })   */

  // getCart
  /*   apiRootWithExistingTokenFlow().me().carts().get().execute().then(res => {
    if (res.body.results[0]?.lineItems)
    console.log(res.body.results[0]?.lineItems)
  }) */

  useEffect(() => {
    apiRootWithExistingTokenFlow()
      .me()
      .carts()
      .get()
      .execute()
      .then((res) => {
        setCountInCart(res.body.results[0]?.lineItems.length || 0);
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

      <div className={classes['cart-container']}>
        {countInCart > 0 ? <CartFull /> : <CartEmpty />}
      </div>
    </div>
  );
}
