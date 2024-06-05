import { Heading, SubHeading } from 'components/heading';
import { useEffect, useState } from 'react';
import { useAppSelector } from 'hooks/typed-react-redux-hooks';
import star from 'assets/images/star.svg';
import { productDetailsSelector } from 'redux/selectors';
import style from '../style.module.css';
import Price from './Price';
import DescriptionText from './DescriptionText';
import DescriptionList from './DescriptionList';

function DescriptionBlock() {
  const { productDetail } = useAppSelector(productDetailsSelector);

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
    Format: attributes['format'],
  };

  return (
    <div className={style['description']}>
      <Heading className={style['description__title']}>{productDetail?.name['en']}</Heading>
      <SubHeading className={style['description__text']}>{attributes['author']}</SubHeading>
      {price ? <Price price={price} discount={discount} /> : null}
      {attributes['rating'] && (
        <div className={style['description__rating']} title={attributes['rating']}>
          <div style={{ width: `${Number(attributes['rating']) * 20}%` }}>
            {Array(5)
              .fill('')
              .map(() => (
                <img src={star} alt="star" key={Math.random()} />
              ))}
          </div>
        </div>
      )}
      <DescriptionText description={attributes['description'] || ''} />
      <DescriptionList descriptionList={descriptionList} />
    </div>
  );
}

export default DescriptionBlock;
