import { ProductData } from '@commercetools/platform-sdk';
import { Heading, SubHeading } from 'components/heading';
import { useEffect, useState } from 'react';
import style from '../style.module.css';

function DescriptionBlock({ product }: { product: ProductData }) {
  const [attributes, setAttributes] = useState<{ [key: string]: string }>({});
  const price = product.masterVariant.prices?.[0]?.value || null;
  const discount = product.masterVariant.prices?.[0]?.discounted?.value || null;

  useEffect(() => {
    setAttributes({});
    product.masterVariant.attributes?.forEach((item) => {
      setAttributes((prev) => ({ ...prev, [item.name]: item.value }));
    });
  }, [product]);

  const descriptionList = {
    'Publication Year': attributes['publicationYear'],
    Publisher: attributes['publisher'],
    Cover: attributes['cover'],
  };

  return (
    <div className={style['description']}>
      <Heading className={style['description__title']}>{product.name['en']}</Heading>
      <SubHeading className={style['description__text']}>{attributes['author']}</SubHeading>
      {price ? (
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
      ) : null}
      <div className={style['description__content']}>
        <div className={style['description__content-title']}>Description</div>
        <div className={style['description__content-text']}>{attributes['description']}</div>
      </div>

      <ul className={style['description__list']}>
        {Object.entries(descriptionList).map((item) => (
          <li key={item[0]}>
            {item[0]}: {item[1]}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DescriptionBlock;
