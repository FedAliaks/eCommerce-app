import apiRootWithExistingTokenFlow from 'SDK/apiRootWithExistingTokenFlow';
import { useEffect, useState } from 'react';
import { LineItem } from '@commercetools/platform-sdk';
import classes from './cartFull.module.css';
import CartProduct from './carttProduct/CartProduct';

export default function CartFull(): JSX.Element {
  const [productArr, setProductArray] = useState<LineItem[]>();

  useEffect(() => {
    // getCart
    apiRootWithExistingTokenFlow()
      .me()
      .carts()
      .get()
      .execute()
      .then((res) => {
        if (res.body.results[0]?.lineItems) {
          setProductArray(res.body.results[0]?.lineItems);
          console.log(productArr);
        }
      });
  }, []);

  return (
    <div className={classes['cart-full__container']}>
      <div>
        <div className={classes['cart-full__product-column-header']}>
          <p>Product</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total cost</p>
        </div>
        <div className={classes['products__container']}>
          {productArr?.map((item) => (
            <CartProduct
              name={item.name['en'] || 'name'}
              image={item.variant.images ? item.variant.images[0]?.url : undefined}
              price={item.price.value.centAmount}
              totalCost={item.totalPrice.centAmount}
              quantity={item.quantity}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
