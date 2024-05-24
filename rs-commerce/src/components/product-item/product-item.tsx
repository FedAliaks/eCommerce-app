import { ProductProjectionItemProps } from 'types/types';
import { CATALOG_PAGE_TEXT } from 'constants/constants';
import image from '../../assets/catalog-page/no-image.jpg';
import style from './style.module.css';

function ProductItem({ product }: ProductProjectionItemProps) {
  const emptyImage: HTMLImageElement = new Image();
  emptyImage.src = image;

  const imgSrc = product.masterVariant.images?.length
    ? product.masterVariant.images[0]?.url
    : emptyImage.src;

  const itemName = product.name['en-US']!;

  const { description } = product;
  const itemDescription = description ? description['en-US'] : '';

  const { prices } = product.masterVariant;
  const curCurrencyCode = prices?.length
    ? prices[0]!.value.currencyCode
    : CATALOG_PAGE_TEXT.noPriceValue;
  const curPriceFormatted = prices?.length
    ? (prices[0]!.value.centAmount / 100).toFixed(2)
    : CATALOG_PAGE_TEXT.noPriceValue;
  const itemPrice = prices ? `${curCurrencyCode} ${curPriceFormatted}` : '';

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
