import { useAppDispatch, useAppSelector } from 'hooks/typed-react-redux-hooks';
import { ProductImageItem } from 'types/types';
import { productDetailSliceActions } from 'redux/slices/product-detail-slice';
import useTouchMove from 'hooks/use-touch-move';
import style from '../style.module.css';

function ModalSlider() {
  const dispatch = useAppDispatch();

  const activeSlide = useAppSelector((state) => state.productDetail.modalActiveSlide);

  const productDetail = useAppSelector((state) => state.productDetail.productDetail);
  const images = productDetail?.masterVariant.images as ProductImageItem[];

  const getPrevSlide = () => {
    dispatch(productDetailSliceActions.setModalActiveSlide(activeSlide - 1));
  };

  const getNextSlide = () => {
    dispatch(productDetailSliceActions.setModalActiveSlide(activeSlide + 1));
  };

  const { handleTouchStart, handleTouchMove } = useTouchMove({
    getPrevSlide,
    getNextSlide,
    activeSlide,
    arrLength: images.length,
  });

  return (
    <div className={style['modal-slider']}>
      {images.length > 1 && (
        <button
          type="button"
          onClick={getPrevSlide}
          disabled={activeSlide === 0}
          className={`${style['image-block-main-slider__btn']} ${style['modal-slider__btn']}`}>
          ❮
        </button>
      )}
      <img
        src={images[activeSlide]?.url}
        alt={images[activeSlide]?.label}
        width={images[activeSlide]?.dimensions.w}
        height={images[activeSlide]?.dimensions.h}
        className={style['modal-slider-image']}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      />
      {images.length > 1 && (
        <button
          type="button"
          onClick={getNextSlide}
          disabled={activeSlide === images.length - 1}
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
            className={`${style['modal-slider__dot']} ${activeSlide === index ? style['active'] : ''}`}
            key={image.url}
          />
        ))}
      </div>
    </div>
  );
}

export default ModalSlider;
