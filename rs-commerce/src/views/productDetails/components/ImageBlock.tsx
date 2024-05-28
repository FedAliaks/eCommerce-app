import { ProductImageItem } from 'types/types';
import style from '../style.module.css';

type ImageBlockProps = {
  images: ProductImageItem[];
};

function ImageBlock({ images }: ImageBlockProps) {
  const mainImage = images[0] as ProductImageItem;
  const otherImages = images.slice(1) as ProductImageItem[];
  return (
    <div className={style['image-block']}>
      <div className={style['image-block-main']}>
        <img
          src={mainImage.url}
          alt={mainImage.label}
          key={mainImage.url}
          width={mainImage.dimensions.w}
          height={mainImage.dimensions.h}
          className={style['image-block-main__item']}
        />
      </div>

      <div className={style['image-block-other']}>
        {otherImages.map((image) => (
          <img
            src={image.url}
            alt={image.label}
            key={image.url}
            width={image.dimensions.w}
            height={image.dimensions.h}
            className={style['image-block-other__item']}
          />
        ))}
      </div>
    </div>
  );
}

export default ImageBlock;
