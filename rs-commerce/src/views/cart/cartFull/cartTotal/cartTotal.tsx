import ButtonDefault from 'components/button-default/ButtonDefault';
import classes from './cartTotal.module.css';

export default function CartTotal(): JSX.Element {
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
        <p className={classes['cart-total__sum']}>250 000 EUR</p>
        <p className={classes['cart-total__subtitle']}>Discounted</p>
        <p className={classes['cart-total__sum']}>-50 000 EUR</p>
        <p className={classes['cart-total__subtitle']}>Total</p>
        <p className={classes['cart-total__sum_colored']}>250 000 EUR</p>
      </div>
      <div>
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
