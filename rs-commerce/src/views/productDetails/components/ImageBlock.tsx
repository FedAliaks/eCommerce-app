import { useState } from 'react';
import Modal from 'components/modal/Modal';
import { productDetailSliceActions } from 'redux/slices/product-detail-slice';
import { useAppDispatch, useAppSelector } from 'hooks/typed-react-redux-hooks';
import style from '../style.module.css';
import PageSlider from './PageSlider';
import ModalSlider from './ModalSlider';

function ImageBlock() {
  const dispatch = useAppDispatch();
  const productDetail = useAppSelector((state) => state.productDetail.productDetail);
  const activeSlide = useAppSelector((state) => state.productDetail.activeSlide);
  const images = productDetail?.masterVariant.images;
  const imagesExceptFirst = images?.slice(1);

  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    dispatch(productDetailSliceActions.setModalActiveSlide(activeSlide));
    setShowModal(true);
  };

  const openModalFromOtherPhotos = (index: number) => {
    dispatch(productDetailSliceActions.setModalActiveSlide(index));
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  return (
    <>
      <div className={style['image-block']}>
        <div className={style['image-block-main']}>
          {images && images[activeSlide] && <PageSlider openModal={openModal} />}
        </div>
        {imagesExceptFirst && imagesExceptFirst?.length > 0 && (
          <div className={style['image-block-other']}>
            {imagesExceptFirst?.map((item, index) => (
              <button
                type="button"
                key={item.url}
                onClick={() => openModalFromOtherPhotos(index + 1)}
                className={style['image-block-other__item']}>
                <img src={item.url} alt={item.label} className={style['image-block-other__item']} />
              </button>
            ))}
          </div>
        )}
      </div>
      {showModal && (
        <Modal onClose={closeModal}>
          <ModalSlider />
        </Modal>
      )}
    </>
  );
}

export default ImageBlock;
