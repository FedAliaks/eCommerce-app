import { useState } from 'react';
import apiRootWithExistingTokenFlow from 'SDK/apiRootWithExistingTokenFlow';
import classes from './cartProduct.module.css';

export type CartProductType = {
  name: string;
  image: string | undefined;
  price: number;
  totalCost: number;
  quantity: number;
  idBook: string;
  idCart: string;
  idLineItems: string;
};

export default function CartProduct(props: CartProductType): JSX.Element {
  const { name, image, price, totalCost, quantity, idBook, idCart, idLineItems } = props;
  const [countProduct, setCountProduct] = useState(quantity);

  const increaseCount = () => {
    setCountProduct(countProduct + 1);

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
                  action: 'addLineItem',
                  productId: idBook,
                },
              ],
            },
          })
          .execute()
          .then(console.log)
          .catch((err) => console.log(err.message));
      })
      .catch(console.log);
  };

  const decreaseCount = () => {
    setCountProduct(countProduct - 1);
    console.log(idBook);
    console.log(idCart);

    apiRootWithExistingTokenFlow()
      .carts()
      .withId({ ID: idCart })
      .get()
      .execute()
      .then((res) => {
        console.log(res);
        apiRootWithExistingTokenFlow()
          .carts()
          .withId({ ID: idCart })
          .post({
            body: {
              version: res.body.version,
              actions: [
                {
                  action: 'changeLineItemQuantity',
                  lineItemId: idLineItems,
                  quantity: countProduct - 1,
                },
              ],
            },
          })
          .execute()
          .then(console.log)
          .catch((err) => console.log(err.message));
      })
      .catch(console.log);
  };

  const deletePositionFromCart = () => {
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
                  action: 'removeLineItem',
                  lineItemId: idBook,
                },
              ],
            },
          })
          .execute()
          .then(console.log)
          .catch(console.log);
      });
  };

  return (
    <div className={classes['product']}>
      {image ? <img className={classes['product__image']} src={image} alt="imageProduct" /> : null}

      <p className={classes['product__content']}>
        {name.length > 15 ? `${name.slice(0, 15)}...` : name}
      </p>

      <p className={classes['product__content']}>{`${price / 100} EUR`}</p>

      <div>
        <button type="button" className={classes['product__button']} onClick={decreaseCount}>
          −
        </button>
        <input className={classes['product__input']} type="text" value={countProduct} readOnly />

        <button type="button" className={classes['product__button']} onClick={increaseCount}>
          +
        </button>
      </div>

      <p>{`${totalCost / 100} EUR`}</p>
      <div
        role="presentation"
        className={classes['product__delete']}
        onClick={deletePositionFromCart}
      />
    </div>
  );
}
