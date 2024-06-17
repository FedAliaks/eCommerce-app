import { useAppDispatch, useAppSelector } from 'hooks/typed-react-redux-hooks';
import { cartSelector, productDetailsSelector } from 'redux/selectors';
import { cartActions } from 'redux/slices/cart-slice';
import { apiUpdateCart, apiGetCart } from 'api/api';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import style from '../style.module.css';

type CartButtonProps = {
  type: 'add' | 'remove';
};

function CartButton({ type }: CartButtonProps) {
  const dispatch = useAppDispatch();

  const { id } = useParams();

  const { productDetail } = useAppSelector(productDetailsSelector);
  const { cartData } = useAppSelector(cartSelector);

  const cardButtonHandler = async () => {
    if (cartData && 'lineItems' in cartData) {
      if (type === 'add') {
        await apiUpdateCart({
          data: {
            version: cartData.version,
            actions: [
              {
                action: 'addLineItem',
                productId: id,
                variantId: productDetail?.masterVariant.id,
                quantity: 1,
              },
            ],
          },
          cartId: cartData.id,
        });

        toast.success('Added to cart!');
      } else {
        const lineItem = cartData.lineItems.find((item) => item.productId === id);
        await apiUpdateCart({
          data: {
            version: cartData.version,
            actions: [
              {
                action: 'removeLineItem',
                lineItemId: lineItem?.id,
                quantity: lineItem?.quantity,
              },
            ],
          },
          cartId: cartData.id,
        });

        toast.success('Removed from cart!');
      }

      const updatedCart = await apiGetCart(cartData.id);
      if (updatedCart?.body) dispatch(cartActions.setCartData(updatedCart?.body));
    }
  };

  return (
    <button className={style['cart-button']} type="button" onClick={cardButtonHandler}>
      {type === 'add' ? 'Add To Cart' : 'Remove From Cart'}
    </button>
  );
}

export default CartButton;
