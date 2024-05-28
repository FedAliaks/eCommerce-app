import { ProductImageItem } from 'types/types';
import { useState } from 'react';
import style from '../style.module.css';

type ImageBlockProps = {
  images: ProductImageItem[];
};

function ImageBlock({ images }: ImageBlockProps) {
  const [activeSlide, setActiveSlide] = useState(0);

  const otherImages = images.slice(1) as ProductImageItem[];

  const getPrevSlide = () => {
    setActiveSlide((prevActiveSlide) => prevActiveSlide - 1);
  };

  const getNextSlide = () => {
    setActiveSlide((prevActiveSlide) => prevActiveSlide + 1);
  };

  return (
    <div className={style['image-block']}>
      <div className={style['image-block-main']}>
        {images && images[activeSlide] && (
          <>
            <button
              type="button"
              onClick={getPrevSlide}
              disabled={activeSlide === 0}
              className={style['image-block-main-slider__btn']}>
              ❮
            </button>
            <img
              src={images[activeSlide]?.url}
              alt={images[activeSlide]?.label}
              key={images[activeSlide]?.url}
              width={images[activeSlide]?.dimensions.w}
              height={images[activeSlide]?.dimensions.h}
              className={style['image-block-main__item']}
            />
            <button
              type="button"
              onClick={getNextSlide}
              disabled={activeSlide === images.length - 1}
              className={style['image-block-main-slider__btn']}>
              ❯
            </button>
          </>
        )}
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
