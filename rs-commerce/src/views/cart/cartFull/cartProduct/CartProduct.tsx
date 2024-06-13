import { useState } from 'react';
import classes from './cartProduct.module.css';

export type CartProductType = {
  name: string;
  image: string | undefined;
  price: number;
  totalCost: number;
  quantity: number;
  idBook: string;
  idCart: string;
};

export default function CartProduct(props: CartProductType): JSX.Element {
  const { name, image, price, totalCost, quantity, idBook, idCart } = props;
  const [countProduct, setCountProduct] = useState(quantity);

  const increaseCount = () => {
    setCountProduct(countProduct + 1);

    /*     apiRootWithExistingTokenFlow().carts().withId({ID: idCart}).get().execute().then(res => {
      console.log(res);
      apiRootWithExistingTokenFlow().carts().withId({ID: idCart}).post({
        body: {
          version: res.body.version,
          actions: [
            {
              action: 'addLineItem',
              productId: idBook,
              variantId: 1,
              quantity: countProduct
            }
          ]
        }
      }).execute().then(console.log).catch(console.log)

      
    })
 */

    /*     apiRootWithExistingTokenFlow().me().carts().get().execute().then(res => 
      {






        apiRootWithExistingTokenFlow().carts().withId({ID: idCart}).post({
          body: {
            version: res.body.results[0]?.version || 1,
            actions: [
              {
                action: 'changeLineItemQuantity',
                quantity: countProduct
              }
            ]
          }
        }).execute().then(result => console.log(result))



      }) */

    console.log(idBook);
    console.log(idCart);
  };

  const decreaseCount = () => {
    setCountProduct(countProduct - 1);
    console.log(idBook);
    console.log(idCart);
  };

  const deletePositionFromCart = () => {
    console.log('delete book');
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
