import { Heading, SubHeading } from 'components/heading';
import { useEffect, useState } from 'react';
import { useAppSelector } from 'hooks/typed-react-redux-hooks';
import style from '../style.module.css';

function DescriptionBlock() {
  const productDetail = useAppSelector((state) => state.productDetail.productDetail);

  const [attributes, setAttributes] = useState<{ [key: string]: string }>({});
  const price = productDetail?.masterVariant.prices?.[0]?.value || null;
  const discount = productDetail?.masterVariant.prices?.[0]?.discounted?.value || null;

  useEffect(() => {
    setAttributes({});
    productDetail?.masterVariant.attributes?.forEach((item) => {
      setAttributes((prev) => ({ ...prev, [item.name]: item.value }));
    });
  }, [productDetail]);

  const descriptionList = {
    'Publication Year': attributes['publicationYear'],
    Publisher: attributes['publisher'],
    Cover: attributes['cover'],
  };

  return (
    <div className={style['description']}>
      <Heading className={style['description__title']}>{productDetail?.name['en']}</Heading>
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
