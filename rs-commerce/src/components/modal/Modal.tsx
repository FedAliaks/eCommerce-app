import style from './style.module.css';

function Modal({ onClose, children }: { onClose: () => void; children: React.ReactNode }) {
  return (
    <div className={style['modal']} role="dialog">
      <button onClick={onClose} type="button" className={style['close-btn']}>
        ×
      </button>
      <div className={style['modal-content']}>{children}</div>
    </div>
  );
}

export default Modal;
