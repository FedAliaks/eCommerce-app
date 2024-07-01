import { Heading } from 'components/heading';
import style from '../style.module.css';

type PriceType = { centAmount: number; currencyCode: string };
type PriceProps = { price: PriceType; discount: PriceType | null };

function Price({ price, discount }: PriceProps) {
  return (
    <Heading className={style['description__price']}>
      {discount ? (
        <span className={style['description__price-new']}>
          {(discount.centAmount / 100).toFixed(2)} {discount.currencyCode}
        </span>
      ) : null}

      <span className={discount ? style['description__price-old'] : ''}>
        {(price.centAmount / 100).toFixed(2)} {price.currencyCode}
      </span>
    </Heading>
  );
}

export default Price;
