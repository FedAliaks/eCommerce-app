import { ButtonPaginationProps } from 'types/types';
import style from './style.module.css';

function ButtonPagination({ curStyle, content, onClick }: ButtonPaginationProps): JSX.Element {
  const btnStyle = (): string =>
    `${style['btn-pagination']} ${curStyle ? style[`${curStyle}`] : ''}`;

  return (
    <button type="button" className={btnStyle()} onClick={onClick}>
      {content}
    </button>
  );
}

export default ButtonPagination;
