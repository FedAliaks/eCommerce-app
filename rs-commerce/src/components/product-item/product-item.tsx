import { ProductItemProps } from 'types/types';
import style from './style.module.css';

function ProductItem({ product }: ProductItemProps) {
  const imgSrc = product.masterData.current.masterVariant.images
    ? product.masterData.current.masterVariant.images[0]?.url
    : 'undef';

  return (
    <div className={style['product-item']}>
      <div className={style['item-name']}>{product.key}</div>
      <img alt={product.key} className={style['item-image']} src={imgSrc} />
    </div>
  );
}

export default ProductItem;
