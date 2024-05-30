import { useAppDispatch, useAppSelector } from 'hooks/typed-react-redux-hooks';
import { ProductImageItem } from 'types/types';
import { productDetailSliceActions } from 'redux/slices/product-detail-slice';
import useTouchMove from 'hooks/use-touch-move';
import { productDetailsSelector } from 'redux/selectors';
import style from '../style.module.css';

function ModalSlider() {
  const dispatch = useAppDispatch();

  const { modalActiveSlide, productDetail } = useAppSelector(productDetailsSelector);

  const images = productDetail?.masterVariant.images as ProductImageItem[];

  const getPrevSlide = () => {
    dispatch(productDetailSliceActions.setModalActiveSlide(modalActiveSlide - 1));
  };

  const getNextSlide = () => {
    dispatch(productDetailSliceActions.setModalActiveSlide(modalActiveSlide + 1));
  };

  const { handleTouchStart, handleTouchMove } = useTouchMove({
    getPrevSlide,
    getNextSlide,
    activeSlide: modalActiveSlide,
    arrLength: images.length,
  });

  return (
    <div className={style['modal-slider']}>
      {images.length > 1 && (
        <button
          type="button"
          onClick={getPrevSlide}
          disabled={modalActiveSlide === 0}
          className={`${style['image-block-main-slider__btn']} ${style['modal-slider__btn']}`}>
          ❮
        </button>
      )}
      <img
        src={images[modalActiveSlide]?.url}
        alt={images[modalActiveSlide]?.label}
        width={images[modalActiveSlide]?.dimensions.w}
        height={images[modalActiveSlide]?.dimensions.h}
        className={style['modal-slider-image']}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      />
      {images.length > 1 && (
        <button
          type="button"
          onClick={getNextSlide}
          disabled={modalActiveSlide === images.length - 1}
          className={`${style['image-block-main-slider__btn']} ${style['modal-slider__btn']}`}>
          ❯
        </button>
      )}
      <div className={style['modal-slider__dots']}>
        {images.map((image, index) => (
          <button
            aria-label="Check the current slide"
            type="button"
            onClick={() => dispatch(productDetailSliceActions.setModalActiveSlide(index))}
            className={`${style['modal-slider__dot']} ${modalActiveSlide === index ? style['active'] : ''}`}
            key={image.url}
          />
        ))}
      </div>
    </div>
  );
}

export default ModalSlider;
