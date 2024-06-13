import apiRootWithExistingTokenFlow from 'SDK/apiRootWithExistingTokenFlow';
import { useEffect, useState } from 'react';
import { Cart, LineItem } from '@commercetools/platform-sdk';
import ButtonBig from 'components/button-big/button-big';
import classes from './cartFull.module.css';
import CartProduct from './cartProduct/CartProduct';
import CartTotal from './cartTotal/cartTotal';

export default function CartFull(): JSX.Element {
  const [productArr, setProductArray] = useState<LineItem[]>();
  const [cartBody, setCartBody] = useState<Cart>();

  const clearCart = () => {
    console.log('clear Cart');
  };

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
          setCartBody(res.body.results[0]);
          console.log('product Arr');
          console.log(productArr);
          console.log(res.body.results[0]);
        }
      });
  }, []);

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
          {productArr?.map((item) => (
            <CartProduct
              name={item.name['en'] || 'name'}
              image={item.variant.images ? item.variant.images[0]?.url : undefined}
              price={item.price.value.centAmount}
              totalCost={item.totalPrice.centAmount}
              quantity={item.quantity}
              idBook={item.productId}
              idCart={cartBody?.id || 'unknown idCart'}
              idLineItems={item.id}
            />
          ))}
          <div className={classes['product__clear-btn-container']}>
            <ButtonBig content="Clear Shopping Cart" isActiveStyle onClick={clearCart} />
          </div>
        </div>
      </div>
      <CartTotal totalPrice={cartBody?.totalPrice.centAmount || 100} idCart={cartBody?.id || ''} />
    </div>
  );
}
