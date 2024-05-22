import { CATALOG_PAGE_TEXT } from 'constants/constants';
import style from '../style.module.css';

function FilterSearch(): JSX.Element {
  return (
    <div className={`${style['button-filter']} ${style['filter3']}`}>
      <div className={style['button-filter-text']}>{CATALOG_PAGE_TEXT.filterSearch}</div>
      <input type="text" className={style['filter-input']} />
    </div>
  );
}

export default FilterSearch;
