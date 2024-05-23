import { ProductItemProps } from 'types/types';
import style from './style.module.css';

function ProductItem({ product }: ProductItemProps) {
  const imgSrc = product.masterData.current.masterVariant.images
    ? product.masterData.current.masterVariant.images[0]?.url
    : 'undef';
  const itemName = product.masterData.current.name['en-US']!;
  const { description } = product.masterData.current;
  const itemDescription = description ? description['en-US'] : '';
  const { prices } = product.masterData.current.masterVariant;
  const itemPrice = prices ? `${prices[2]?.value.currencyCode} ${prices[2]?.value.centAmount}` : '';

  return (
    <div className={style['product-item']}>
      <div className={style['item-image-wrapper']}>
        <img alt={product.key} className={style['item-image']} src={imgSrc} />
      </div>
      <div className={style['item-text-wrapper']}>
        <div className={style['item-name']}>{itemName}</div>
        <div className={style['item-description']}>{itemDescription}</div>
        <div className={style['item-price']}>{itemPrice}</div>
      </div>
    </div>
  );
}

export default ProductItem;
