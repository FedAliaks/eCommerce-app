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

  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    dispatch(productDetailSliceActions.setModalActiveSlide(activeSlide));
    setShowModal(true);
  };
  const closeModal = () => setShowModal(false);

  return (
    <>
      <div className={style['image-block']}>
        <div className={style['image-block-main']}>
          {images && images[activeSlide] && <PageSlider openModal={openModal} />}
        </div>
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
