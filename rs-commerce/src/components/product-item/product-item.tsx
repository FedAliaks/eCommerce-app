import { ProductProjectionItemProps } from 'types/types';
import { NUMBER_ZERO, ROUTE_PATH } from 'constants/constants';
import { Link } from 'react-router-dom';
import image from '../../assets/catalog-page/no-image.jpg';
import style from './style.module.css';

function ProductItem({ product }: ProductProjectionItemProps) {
  const emptyImage: HTMLImageElement = new Image();
  emptyImage.src = image;

  const itemImgSrc = product.masterVariant.images?.length
    ? product.masterVariant.images[0]?.url
    : emptyImage.src;

  const { attributes } = product.masterVariant;
  const itemRating = `Rating: ${attributes ? attributes[1]?.value : NUMBER_ZERO}`;
  const itemName = product.name['en'];
  const itemAuthorYear = attributes ? `${attributes[0]?.value}, ${attributes[4]?.value}` : '';
  const itemDescription = attributes ? attributes[2]?.value : '';
  const itemCover = attributes ? `Cover: ${attributes[3]?.value}` : '';
  const itemFormat = attributes ? `Format: ${attributes[6]?.value}` : '';

  const { prices } = product.masterVariant;
  let curCurrencyCode = '';
  let curPriceFormatted = '';
  let curDiscountedPriceFormatted = '';
  let curDiscountedPercentFormatted = '';
  if (prices?.length) {
    const { currencyCode } = prices[0]!.value;
    const price = prices[0]!.value.centAmount;
    const priceDiscount = prices[0]!.discounted?.value.centAmount;

    if (currencyCode) curCurrencyCode = currencyCode;
    if (price) curPriceFormatted = (price / 100).toFixed(2);
    if (priceDiscount) curDiscountedPriceFormatted = ((priceDiscount as number) / 100).toFixed(2);
    if (price && priceDiscount) {
      curDiscountedPercentFormatted = `-${(100 - ((priceDiscount as number) / price) * 100).toFixed(
        2,
      )}%`;
    }
  }

  let itemPrice = '';
  let itemPriceStyle = '';
  let itemDiscountedPrice = '';
  if (curDiscountedPriceFormatted) {
    itemPrice = `${curCurrencyCode} ${curDiscountedPriceFormatted}`;
    itemPriceStyle = `${style['item-price']} ${style['for-discount']}`;
    itemDiscountedPrice = `${curCurrencyCode} ${curPriceFormatted}`;
  } else {
    itemPrice = `${curCurrencyCode} ${curPriceFormatted}`;
    itemPriceStyle = `${style['item-price']}`;
    itemDiscountedPrice = '';
  }

  return (
    <Link to={`${ROUTE_PATH.productDetails}/${product.id}`} className={style['product-item']}>
      <div className={style['item-image-wrapper']}>
        <img alt={product.key} className={style['item-image']} src={itemImgSrc} />
        {curDiscountedPriceFormatted && (
          <div className={style['discount-label']}>{curDiscountedPercentFormatted}</div>
        )}
      </div>
      <div className={style['item-text-wrapper']}>
        <div className={style['item-rating']}>{itemRating}</div>
        <div className={style['item-name']}>{itemName}</div>
        <div className={style['item-author-year']}>{itemAuthorYear}</div>
        <div className={style['item-description']}>{itemDescription}</div>
        <div className={style['item-cover']}>{itemCover}</div>
        <div className={style['item-format']}>{itemFormat}</div>
        <div className={style['item-prices-wrapper']}>
          <div className={itemPriceStyle}>{itemPrice}</div>
          <div className={style['item-price-discounted']}>{itemDiscountedPrice}</div>
        </div>
      </div>
    </Link>
  );
}

export default ProductItem;
