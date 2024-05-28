import { useAppDispatch, useAppSelector } from 'hooks/typed-react-redux-hooks';
import { ProductImageItem } from 'types/types';
import { productDetailSliceActions } from 'redux/slices/product-detail-slice';
import style from '../style.module.css';

type PageSliderProps = {
  openModal: () => void;
};

function PageSlider({ openModal }: PageSliderProps) {
  const dispatch = useAppDispatch();
  const activeSlide = useAppSelector((state) => state.productDetail.activeSlide);

  const productDetail = useAppSelector((state) => state.productDetail.productDetail);
  const images = productDetail?.masterVariant.images as ProductImageItem[];

  const getPrevSlide = () => {
    dispatch(productDetailSliceActions.setActiveSlide(activeSlide - 1));
  };

  const getNextSlide = () => {
    dispatch(productDetailSliceActions.setActiveSlide(activeSlide + 1));
  };

  return (
    <>
      <button
        type="button"
        onClick={getPrevSlide}
        disabled={activeSlide === 0}
        className={style['image-block-main-slider__btn']}>
        ❮
      </button>
      <button type="button" onClick={openModal} className={style['image-block-main__item']}>
        <img
          src={images[activeSlide]?.url}
          alt={images[activeSlide]?.label}
          key={images[activeSlide]?.url}
          width={images[activeSlide]?.dimensions.w}
          height={images[activeSlide]?.dimensions.h}
          className={style['image-block-main__item']}
        />
      </button>
      <button
        type="button"
        onClick={getNextSlide}
        disabled={activeSlide === images.length - 1}
        className={style['image-block-main-slider__btn']}>
        ❯
      </button>
    </>
  );
}

export default PageSlider;
