import ButtonBig from 'components/button-big/button-big';
import style from './style.module.css';

function Pagination() {
  return (
    <div className={style['pagination']}>
      <div>select page: </div>
      <ButtonBig content="Prev" />
      <ButtonBig content="10" isActiveStyle />
      <div>of</div>
      <ButtonBig content="10" isActiveStyle />
      <ButtonBig content="Next" />
    </div>
  );
}

export default Pagination;
