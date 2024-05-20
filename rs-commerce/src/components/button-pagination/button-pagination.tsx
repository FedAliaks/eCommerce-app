import style from './style.module.css';

export type ButtonPaginationProps = {
  content: string;
  isActiveStyle?: boolean;
  onClick?: () => void;
};

function ButtonPagination({ isActiveStyle, content, onClick }: ButtonPaginationProps): JSX.Element {
  const btnStyle = (): string =>
    isActiveStyle
      ? `${style['btn-pagination']}`
      : `${style['btn-pagination']} ${style['btn-not-active']}`;

  return (
    <button type="button" className={btnStyle()} onClick={onClick}>
      {content}
    </button>
  );
}

export default ButtonPagination;
