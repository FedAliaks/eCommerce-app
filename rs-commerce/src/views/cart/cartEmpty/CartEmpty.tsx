import ButtonBig from 'components/button-big/button-big';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from 'constants/constants';
import classes from './cartEmpty.module.css';

export default function CartEmpty(): JSX.Element {
  const navigate = useNavigate();
  const goToCatalog = () => {
    navigate(ROUTE_PATH.catalog);
  };

  return (
    <div className={classes['cart-empty__container']}>
      <h2 className={classes['cart-empty__title']}>Cart is empty</h2>
      <p className={classes['cart-empty__content']}>
        Your cart is empty. Come back to catalog to add books you want to buy
      </p>
      <ButtonBig isActiveStyle content="Catalog" onClick={goToCatalog} />
    </div>
  );
}
