import { useState } from 'react';
import classes from './cartProduct.module.css';

export type CartProductType = {
  name: string;
  image: string | undefined;
  price: number;
  totalCost: number;
  quantity: number;
};

export default function CartProduct(props: CartProductType): JSX.Element {
  const { name, image, price, totalCost, quantity } = props;
  const [countProduct, setCountProduct] = useState(quantity);

  const increaseCount = () => {
    setCountProduct(countProduct + 1);
  };

  const decreaseCount = () => {
    setCountProduct(countProduct - 1);
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
      <img src="/src/assets/images/basket-for-cart.png" alt="clear-position" />
    </div>
  );
}
