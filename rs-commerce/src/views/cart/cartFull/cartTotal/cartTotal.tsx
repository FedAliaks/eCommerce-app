import ButtonDefault from 'components/button-default/ButtonDefault';
import classes from './cartTotal.module.css';

export type CartTotalType = {
  totalPrice: number;
};

export default function CartTotal(props: CartTotalType): JSX.Element {
  const { totalPrice } = props;
  const usePromoCode = () => {
    console.log('add promo');
  };

  const clickCheckOut = () => {
    console.log('click check out');
  };

  return (
    <div className={classes['cart-total__container']}>
      <h2 className={classes['cart-total__title']}>Cart Total</h2>
      <div className={classes['cart-total__sum-container']}>
        <p className={classes['cart-total__subtitle']}>Subtotal</p>
        <p className={classes['cart-total__sum']}>{`${totalPrice / 100} EUR`}</p>
        <p className={classes['cart-total__subtitle']}>Discounted</p>
        <p className={classes['cart-total__sum']}>-50 000 EUR</p>
        <p className={classes['cart-total__subtitle']}>Total</p>
        <p className={classes['cart-total__sum_colored']}>{`${totalPrice / 100} EUR`}</p>
      </div>
      <div className={classes['cart-total__promo-container']}>
        <input
          type="text"
          placeholder="Input Promo Code"
          className={classes['cart-total__promo']}
        />
        <ButtonDefault content="Apply" colored onClick={usePromoCode} isActive small />
      </div>
      <ButtonDefault content="Check out" colored={false} onClick={clickCheckOut} isActive />
    </div>
  );
}
