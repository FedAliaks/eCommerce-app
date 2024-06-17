import { useState } from 'react';
import apiRootWithExistingTokenFlow from 'SDK/apiRootWithExistingTokenFlow';
import { LineItem } from '@commercetools/platform-sdk';
import { apiAuthSelector } from 'redux/selectors';
import { useAppSelector } from 'hooks/typed-react-redux-hooks';
import apiRootWithAnonymousSessionFlow from 'SDK/apiRootWithAnonymousSessionFlow';
import { LOCAL_STORAGE_ANONYM_CART_ID, LOCAL_STORAGE_AUTH_CART_ID } from 'constants/constants';
import classes from './cartProduct.module.css';

export type CartProductType = {
  product: LineItem;
  updateCart: () => void;
};

export default function CartProduct(props: CartProductType): JSX.Element {
  const { product, updateCart } = props;
  const image = Array.isArray(product.variant.images) ? product.variant.images[0]?.url : '';
  const name = product.name['en'] || '';
  const startPrice = product.price.value.centAmount;
  const priceDiscounted = product.price.discounted?.value.centAmount;
  const totalPrice = product.totalPrice.centAmount;

  const [countProduct, setCountProduct] = useState(product.quantity);
  const { isAuth } = useAppSelector(apiAuthSelector);
  const idAnonymCart: string = localStorage.getItem(LOCAL_STORAGE_ANONYM_CART_ID) as string;
  const idAuthCart: string = localStorage.getItem(LOCAL_STORAGE_AUTH_CART_ID) as string;

  const increaseCount = () => {
    setCountProduct(countProduct + 1);

    if (isAuth) {
      apiRootWithExistingTokenFlow()
        .carts()
        .withId({ ID: idAuthCart })
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
                    action: 'addLineItem',
                    productId: product.productId,
                  },
                ],
              },
            })
            .execute()
            .then(() => {
              updateCart();
            })
            .catch((err) => console.log(err.message));
        })
        .catch(console.log);
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
                    action: 'addLineItem',
                    productId: product.productId,
                  },
                ],
              },
            })
            .execute()
            .then(() => {
              updateCart();
            })
            .catch((err) => console.log(err.message));
        })
        .catch(console.log);
    }
  };

  const decreaseCount = () => {
    setCountProduct(countProduct - 1);
    updateCart();
    console.log('decreaseCount');

    if (isAuth) {
      apiRootWithExistingTokenFlow()
        .carts()
        .withId({ ID: idAuthCart })
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
                    action: 'changeLineItemQuantity',
                    lineItemId: product.id,
                    quantity: countProduct - 1,
                  },
                ],
              },
            })
            .execute()
            .then(() => {
              updateCart();
            })
            .catch((err) => console.log(err.message));
        })
        .catch(console.log);
    } else {
      apiRootWithAnonymousSessionFlow()
        .carts()
        .withId({ ID: idAnonymCart })

        .get()
        .execute()
        .then((res) => {
          console.log(res);
          apiRootWithAnonymousSessionFlow()
            .carts()
            .withId({ ID: idAnonymCart })
            .post({
              body: {
                version: res.body.version,
                actions: [
                  {
                    action: 'changeLineItemQuantity',
                    lineItemId: product.id,
                    quantity: countProduct - 1,
                  },
                ],
              },
            })
            .execute()
            .then(() => {
              updateCart();
            })
            .catch((err) => console.log(err.message));
        })
        .catch(console.log);
    }
  };

  const deletePositionFromCart = () => {
    if (isAuth) {
      apiRootWithExistingTokenFlow()
        .carts()
        .withId({ ID: idAuthCart })
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
                    action: 'removeLineItem',
                    lineItemId: product.id,
                  },
                ],
              },
            })
            .execute()
            .then(() => updateCart())
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
                    action: 'removeLineItem',
                    lineItemId: product.id,
                  },
                ],
              },
            })
            .execute()
            .then(() => updateCart())
            .catch(console.log);
        });
    }
  };

  return (
    <div className={classes['product']}>
      {image ? <img className={classes['product__image']} src={image} alt="imageProduct" /> : null}

      <p className={classes['product__content']}>
        {name.length > 15 ? `${name.slice(0, 15)}...` : name}
      </p>

      <div className={classes['price-component']}>
        <p
          className={
            classes['product__content']
          }>{`${(priceDiscounted || startPrice) / 100} EUR`}</p>

        {priceDiscounted ? (
          <p
            className={`${classes['product__content']} ${classes['product__content_colored']}  `}>{`${startPrice / 100} EUR`}</p>
        ) : null}
      </div>

      <div>
        <button type="button" className={classes['product__button']} onClick={decreaseCount}>
          −
        </button>
        <input className={classes['product__input']} type="text" value={countProduct} readOnly />

        <button type="button" className={classes['product__button']} onClick={increaseCount}>
          +
        </button>
      </div>

      <p>{`${totalPrice / 100} EUR`}</p>
      <div
        role="presentation"
        className={classes['product__delete']}
        onClick={deletePositionFromCart}
      />
    </div>
  );
}
