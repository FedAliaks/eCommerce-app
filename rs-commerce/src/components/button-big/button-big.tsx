import { ButtonBigProps } from 'types/types';

function ButtonBig(props: ButtonBigProps): JSX.Element {
  const { style, content, onClick } = props;

  return (
    <button type="button" className={style} onClick={onClick}>
      {content}
    </button>
  );
}

export default ButtonBig;
